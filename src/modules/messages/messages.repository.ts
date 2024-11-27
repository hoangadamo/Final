import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository, Message } from 'src/database';

@Injectable()
export class MessagesRepository extends BaseRepository<Message> {
  constructor(@InjectModel(Message) readonly model: typeof Message) {
    super(model);
  }
}
