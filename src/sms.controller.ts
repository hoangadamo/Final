import { Controller, Post, Body, Res } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async sendSms(@Body('to') to: string) {
    return this.smsService.sendSms(to);
  }

  @Post('receive')
  async receiveReply(
    @Body()
    body: {
      MessageSid: string;
      From: string;
      To: string;
      Body: string;
    },
  ) {
    console.log(body);
    return await this.smsService.receiveReply({
      sid: body.MessageSid,
      from: body.From,
      to: body.To,
      body: body.Body,
    });
  }
}
