import { BadRequestException, Injectable } from '@nestjs/common';

import {
  LoginDTO,
  RegisterDTO,
  SendOTPDto,
  StoreRegisterDTO,
  VerifyOTPDto,
} from './dto';
import { Store, User } from 'src/database';
import * as bcrypt from 'bcrypt';
import {
  CommonHelper,
  ErrorHelper,
  SendEmailHelper,
  TokenHelper,
} from 'src/utils';
import { UsersRepository } from '../users';
import { APPLICATION, OTP, STORE, USER } from 'src/constants';
import { ILoginResponse, IStoreLoginResponse, IToken } from 'src/interfaces';
import { emailSender, token } from 'src/configs';
import moment from 'moment';
import md5 from 'md5';
import { StoresRepository } from '../stores';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private storesRepository: StoresRepository,
  ) {}

  async register(payload: RegisterDTO): Promise<User> {
    const { name, phone, email, password } = payload;

    if (!name || !phone || !email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    const existingUser = await this.usersRepository.findOne({
      where: [{ email: payload.email }, { phone: payload.phone }],
    });

    if (existingUser) {
      ErrorHelper.BadRequestException('email or phone already exists');
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await this.usersRepository.create({
      ...payload,
      password: hashed,
      isAdmin: false,
      isVerify: false,
      rankId: 1,
    });
    const user = newUser.dataValues;
    delete user.password;
    return user;
  }

  async storeRegister(payload: StoreRegisterDTO): Promise<Store> {
    const { name, email, password } = payload;

    if (!name || !email || !password) {
      throw new BadRequestException('missing required fields');
    }

    const existingStore = await this.storesRepository.findOne({
      where: [{ email: payload.email }],
    });

    if (existingStore) {
      ErrorHelper.BadRequestException('store email already exists');
    }

    const hashed = await bcrypt.hash(password, 10);

    const newStore = await this.storesRepository.create({
      ...payload,
      password: hashed,
      isApproved: false,
    });
    const store = newStore.dataValues;
    delete store.password;
    return store;
  }

  private generateToken(payload: object): IToken {
    const { token: accessToken, expires } = TokenHelper.generate(
      payload,
      token.secretKey,
      token.expireTime,
    );
    const { token: refreshToken } = TokenHelper.generate(
      payload,
      token.rfSecretKey,
      token.rfExpireTime,
    );

    return {
      accessToken,
      expires,
      refreshToken,
    };
  }

  async login(body: LoginDTO): Promise<ILoginResponse> {
    const { password, email } = body;
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      ErrorHelper.BadRequestException(USER.USER_NOT_FOUND);
    }

    if (!user.isVerify) {
      ErrorHelper.BadRequestException('user is not verified');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      ErrorHelper.BadRequestException(USER.INVALID_PASSWORD);

    const token = this.generateToken({ id: user.id, isAdmin: user.isAdmin });
    delete user.password;
    return {
      ...token,
      user,
    };
  }

  async storeLogin(body: LoginDTO): Promise<IStoreLoginResponse> {
    const { password, email } = body;
    const store = await this.storesRepository.findOne({
      where: {
        email,
      },
    });

    if (!store) {
      ErrorHelper.BadRequestException(STORE.STORE_NOT_FOUND);
    }

    if (!store.isVerify) {
      ErrorHelper.BadRequestException('store is not verified');
    }

    const isValidPassword = await bcrypt.compare(password, store.password);
    if (!isValidPassword)
      ErrorHelper.BadRequestException(STORE.INVALID_PASSWORD);

    const token = this.generateToken({ id: store.id });
    delete store.password;
    return {
      ...token,
      store,
    };
  }

  async sendOTP(payload: SendOTPDto): Promise<string> {
    const { email, hash } = payload;
    const user = await this.usersRepository.findOne({ where: [{ email }] });
    if (!user) {
      ErrorHelper.NotFoundException('user not found');
    }
    const checkHash = md5(
      email + emailSender.secretKeySendGmail + moment().format('DD/MM/YYYY'),
    );
    console.log('check-hash: ', checkHash);

    if (checkHash !== hash) {
      ErrorHelper.InternalServerErrorException(APPLICATION.HASH_IS_NOT_CORRECT);
    }

    const OTP = CommonHelper.generateOTP();
    console.log('OTP: ', OTP);

    SendEmailHelper.sendOTP({
      to: email,
      subject: 'Confirm OTP',
      OTP,
    });

    const hashCode = CommonHelper.hashData(
      JSON.stringify({
        otp: OTP,
        time: moment().add(emailSender.otpTimeExpire, 'second').valueOf(),
        email,
        isVerified: false,
      }),
    );

    await this.usersRepository.update(
      { otp: OTP, otpExpireTime: emailSender.otpTimeExpire },
      { where: { email } },
    );

    await this.storesRepository.update(
      { otp: OTP, otpExpireTime: emailSender.otpTimeExpire },
      { where: { email } },
    );

    return hashCode;
  }

  async verifyOTP(payload: VerifyOTPDto): Promise<string> {
    const { otp, hash } = payload;
    const checkHashInfo = CommonHelper.checkHashData(hash);
    if (!checkHashInfo) {
      ErrorHelper.BadRequestException(APPLICATION.VERIFY_FAIL);
    }

    const hashInfo = JSON.parse(checkHashInfo);
    if (hashInfo.time < new Date().getTime()) {
      ErrorHelper.InternalServerErrorException(OTP.OTP_TIMEOUT);
    }

    if (otp !== hashInfo.otp) {
      ErrorHelper.InternalServerErrorException(OTP.OTP_INVALID);
    }

    await this.usersRepository.update(
      { isVerify: true },
      { where: { email: hashInfo.email } },
    );

    await this.storesRepository.update(
      { isVerify: true },
      { where: { email: hashInfo.email } },
    );

    const hashCode = CommonHelper.hashData(
      JSON.stringify({
        time: moment().add(emailSender.otpTimeExpire, 'second').valueOf(),
        email: hashInfo.email,
        isVerified: true,
      }),
    );

    return hashCode;
  }
}
