import { Injectable } from '@nestjs/common';
import Twilio from 'twilio';

import * as dotenv from 'dotenv';
import { MessagesRepository } from './modules/messages/messages.repository';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { ErrorHelper } from './utils';
dotenv.config();

@Injectable()
export class SmsService {
  private client: Twilio.Twilio;

  constructor(private messagesRepository: MessagesRepository) {
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  generateCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async sendSms(to: string) {
    const code = this.generateCode();
    const body = `Your verification code is: ${code}`;

    const message = await this.messagesRepository.create({
      sid: '',
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body,
      direction: 'outbound',
    });

    console.log(code);

    const result = await this.client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    await message.update({
      sid: result.sid,
    });
    return result;
  }

  async receiveReply(reply: {
    sid: string;
    from: string;
    to: string;
    body: string;
  }) {
    // const twiml = new MessagingResponse();
    // twiml.message('Thank you for your reply');

    return this.messagesRepository.create({
      sid: reply.sid,
      from: reply.from,
      to: reply.to,
      body: reply.body,
      direction: 'inbound',
    });
  }
}
