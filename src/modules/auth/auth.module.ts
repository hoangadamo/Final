import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/database';
import { UsersModule } from '../users';

@Module({
  imports: [SequelizeModule.forFeature([User]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
