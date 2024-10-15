import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository, Transaction } from 'src/database';

@Injectable()
export class TransactionsRepository extends BaseRepository<Transaction> {
  constructor(@InjectModel(Transaction) readonly model: typeof Transaction) {
    super(model);
  }
}
