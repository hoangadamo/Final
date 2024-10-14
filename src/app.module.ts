import { Module } from '@nestjs/common';

import { PostgresqlModule } from './database';
import { UsersModule } from './modules';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RanksModule } from './modules/ranks/ranks.module';
import { StoresModule } from './modules/stores/stores.module';
import { RewardsModule } from './modules/rewards';

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
