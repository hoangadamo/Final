import { BadRequestException, Injectable } from '@nestjs/common';

import { LoginDTO, RegisterDTO } from './dto';
import { User } from 'src/database';
import * as bcrypt from 'bcrypt';
import {
  CommonHelper,
  EncryptHelper,
  ErrorHelper,
  TokenHelper,
} from 'src/utils';
import { UsersRepository } from '../users';
import { USER } from 'src/constants';
import { IToken } from 'src/interfaces';
import { token } from 'src/configs';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async register(payload: RegisterDTO): Promise<object> {
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
      otp: 1000,
      otpExpireTime: 10,
      rankId: 1,
    });
    const user = newUser.dataValues;
    delete user.password;
    return {
      user,
    };
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

  async login(body: LoginDTO): Promise<object> {
    const { password, email } = body;
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      ErrorHelper.BadRequestException(USER.USER_NOT_FOUND);
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
}
