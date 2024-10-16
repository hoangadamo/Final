import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository, Redemption } from 'src/database';

@Injectable()
export class RedemptionsRepository extends BaseRepository<Redemption> {
  constructor(@InjectModel(Redemption) readonly model: typeof Redemption) {
    super(model);
  }
}
