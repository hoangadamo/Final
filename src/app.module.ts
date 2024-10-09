import { Module } from '@nestjs/common';

import { PostgresqlModule } from './database';
import { UsersModule } from './modules';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RanksModule } from './modules/ranks/ranks.module';
import { StoresModule } from './modules/stores/stores.module';

@Module({
  imports: [
    RanksModule,
    StoresModule,
    UsersModule,
    PostgresqlModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
