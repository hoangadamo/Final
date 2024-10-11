import { Injectable } from '@nestjs/common';
import { RanksRepository } from './ranks.repository';
import { CreateRankDTO, GetListRanksDto } from './dto';
import { ErrorHelper } from 'src/utils';
import { Rank } from 'src/database';
import { IPaginationRes } from 'src/interfaces';
import { Op } from 'sequelize';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';

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
    return await this.ranksRepository.create({
      ...payload,
    });
  }

  async getListRanks(payload: GetListRanksDto): Promise<IPaginationRes<Rank>> {
    const { page, limit } = payload;
    if (page && limit) {
      return await this.ranksRepository.paginate({}, page, limit);
    }
    return await this.ranksRepository.paginate({}, FIRST_PAGE, LIMIT_PAGE);
  }

  async getRankDetails(id: number): Promise<Rank> {
    const rank = await this.ranksRepository.findOne({ where: [{ id }] });
    if (!rank) {
      ErrorHelper.BadRequestException('rank not found');
    }
    return rank;
  }
}
