import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Store, User } from 'src/database';
import { UsersRepository } from '../users';
import { StoresRepository } from '../stores';

@Module({
  imports: [SequelizeModule.forFeature([User, Store])],
  controllers: [AuthController],
  providers: [AuthService, StoresRepository, UsersRepository],
})
export class AuthModule {}
