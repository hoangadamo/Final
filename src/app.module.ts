import { Module } from '@nestjs/common';

import { PostgresqlModule } from './database';
import { AuthModule, RanksModule, RewardsModule, StoresModule, UsersModule } from './modules';
import { AppController } from './app.controller';

@Module({
  imports: [
    RanksModule,
    StoresModule,
    UsersModule,
    PostgresqlModule,
    AuthModule,
    RewardsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
