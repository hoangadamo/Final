import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  LoginDTO,
  RegisterDTO,
  SendOTPDto,
  StoreRegisterDTO,
  UserLoginDTO,
  VerifyOTPDto,
} from './dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'API User Register' })
  @Post('register')
  async register(@Body() payload: RegisterDTO) {
    return await this.authService.register(payload);
  }

  @ApiOperation({ summary: 'API Store Register' })
  @Post('store-register')
  async storeRegister(@Body() payload: StoreRegisterDTO) {
    return await this.authService.storeRegister(payload);
  }

  @ApiOperation({ summary: 'API Login' })
  @ApiBody({
    type: LoginDTO,
    required: true,
    description: 'Login',
  })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() payload: LoginDTO) {
    return this.authService.login(payload);
  }

  @ApiOperation({ summary: 'API Send OTP' })
  @Post('/send-otp')
  @HttpCode(200)
  async sendOtp(@Body() payload: SendOTPDto) {
    const result = await this.authService.sendOTP(payload);
    return {
      hash: result,
    };
  }

  @ApiOperation({ summary: 'API Verify OTP' })
  @Post('/verify-otp')
  @HttpCode(200)
  async verifyOtp(@Body() payload: VerifyOTPDto) {
    const result = await this.authService.verifyOTP(payload);
    return {
      hash: result,
    };
  }

  @ApiOperation({ summary: 'API Store Login' })
  @Post('/store-login')
  @HttpCode(200)
  async storeLogin(@Body() payload: LoginDTO) {
    return this.authService.storeLogin(payload);
  }

  @ApiOperation({ summary: 'API User Login' })
  @Post('/user-login')
  @HttpCode(200)
  async userLogin(@Body() payload: UserLoginDTO) {
    return this.authService.userLogin(payload);
  }
}
