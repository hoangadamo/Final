import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() payload: RegisterDTO): Promise<any> {
    return await this.authService.register(payload);
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
}
