import { Module } from '@nestjs/common';

import { PostgresqlModule } from './database';
import {
  AuthModule,
  RanksModule,
  RewardsModule,
  StoresModule,
  UsersModule,
} from './modules';
import { AppController } from './app.controller';
import { RedemptionsModule } from './modules/redemptions';

@Module({
  imports: [
    RanksModule,
    StoresModule,
    UsersModule,
    PostgresqlModule,
    AuthModule,
    RewardsModule,
    RedemptionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
