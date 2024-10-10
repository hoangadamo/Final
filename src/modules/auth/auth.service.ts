import { BadRequestException, Injectable } from '@nestjs/common';

import { LoginDTO, RegisterDTO } from './dto';
import { User } from 'src/database';
import * as bcrypt from 'bcrypt';
import {
  CommonHelper,
  ErrorHelper,
  SendEmailHelper,
  TokenHelper,
} from 'src/utils';
import { UsersRepository } from '../users';
import { APPLICATION, OTP, USER } from 'src/constants';
import { ILoginResponse, IToken } from 'src/interfaces';
import { emailSender, token } from 'src/configs';
import moment from 'moment';
import * as md5 from 'md5';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

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
      otp: '0000',
      otpExpireTime: 10,
      rankId: 1,
    });
    const user = newUser.dataValues;
    delete user.password;
    return user;
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

    if (user.otp !== 'veri') {
      ErrorHelper.BadRequestException('user is not verified');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      ErrorHelper.BadRequestException(USER.INVALID_PASSWORD);

    const token = this.generateToken({ id: user.id });
    delete user.password;
    return {
      ...token,
      user,
    };
  }

  async sendOTP(email: string, hash: string): Promise<string> {
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
    // set user OTP
    await this.usersRepository.update({ otp: OTP }, { where: [{ email }] });

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
    return hashCode;
  }

  async verifyOTP(otp: string, hash: string): Promise<string> {
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

    // set user otp to be 'veri'
    console.log(hashInfo.email);
    await this.usersRepository.update(
      { otp: 'veri' },
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
