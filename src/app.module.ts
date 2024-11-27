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
import { SmsModule } from './sms.module';
import { UploadsModule } from './modules/uploads';
import { S3UploadModule } from './modules/s3-upload/s3-upload.module';

@Module({
  imports: [
    RanksModule,
    StoresModule,
    UsersModule,
    PostgresqlModule,
    AuthModule,
    RewardsModule,
    RedemptionsModule,
    SmsModule,
    UploadsModule,
    S3UploadModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
