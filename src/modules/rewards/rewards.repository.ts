import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository, Reward } from 'src/database';

@Injectable()
export class RewardsRepository extends BaseRepository<Reward> {
  constructor(@InjectModel(Reward) readonly model: typeof Reward) {
    super(model);
  }
}
