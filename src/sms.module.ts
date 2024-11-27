import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { MessagesRepository } from './modules/messages/messages.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './database';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  providers: [SmsService, MessagesRepository],
  controllers: [SmsController],
})
export class SmsModule {}
