import { Injectable } from '@nestjs/common';
import { RanksRepository } from './ranks.repository';
import { CreateRankDTO, GetListRanksDto, UpdateRankDto } from './dto';
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

  async updateRank(id: number, payload: UpdateRankDto): Promise<Rank> {
    const rank = await this.ranksRepository.findOne({ where: [{ id }] });
    if (!rank) {
      ErrorHelper.BadRequestException('rank not found');
    }

    const {
      name,
      pointsThreshold,
      amount,
      fixedPoint,
      percentage,
      maxPercentagePoints,
    } = payload;

    const data: any = {};
    if (name) data.name = name;
    if (pointsThreshold) data.pointsThreshold = pointsThreshold;
    if (amount) data.amount = amount;
    if (fixedPoint) data.fixedPoint = fixedPoint;
    if (percentage) data.percentage = percentage;
    if (maxPercentagePoints) data.maxPercentagePoints = maxPercentagePoints;

    await this.ranksRepository.update(data, { where: [{ id }] });
    return await this.ranksRepository.findOne({ where: [{ id }] });
  }
}
