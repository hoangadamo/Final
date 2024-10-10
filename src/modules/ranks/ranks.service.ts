import { Injectable } from '@nestjs/common';
import { RanksRepository } from './ranks.repository';
import { CreateRankDTO } from './dto';
import { ErrorHelper } from 'src/utils';
import { Rank } from 'src/database';

@Injectable()
export class RanksService {
  constructor(private ranksRepository: RanksRepository) {}

  async createRank(payload: CreateRankDTO): Promise<Rank> {
    const { name } = payload;
    const existingRank = await this.ranksRepository.findOne({
      where: [{ name: name }],
    });
    if (existingRank) {
      ErrorHelper.BadRequestException('rank already exists');
    }
    const newRank = await this.ranksRepository.create({
      ...payload,
    });
    return newRank;
  }
}
