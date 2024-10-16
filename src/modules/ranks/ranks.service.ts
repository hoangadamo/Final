import { Injectable } from '@nestjs/common';
import { RanksRepository } from './ranks.repository';
import { CreateRankDTO, GetListRanksDto, UpdateRankDto } from './dto';
import { ErrorHelper } from 'src/utils';
import { Rank } from 'src/database';
import { IPaginationRes } from 'src/interfaces';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';
import { UsersRepository } from '../users';

@Injectable()
export class RanksService {
  constructor(
    private ranksRepository: RanksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async updateUserRank(): Promise<void> {
    const ranks = await this.ranksRepository.find({
      order: [['pointsThreshold', 'DESC']],
    });

    const users = await this.usersRepository.find();
    for (const user of users) {
      for (const rank of ranks) {
        if (user.points >= rank.pointsThreshold) {
          await this.usersRepository.update(
            { rankId: rank.id },
            { where: { id: user.id } },
          );
          break;
        }
      }
    }
  }

  async createRank(payload: CreateRankDTO): Promise<Rank> {
    const { name } = payload;
    const existingRank = await this.ranksRepository.findOne({
      where: [{ name: name }],
    });
    if (existingRank) {
      ErrorHelper.BadRequestException('rank already exists');
    }
    // update user rank_id if needed
    await this.updateUserRank();

    return await this.ranksRepository.create({
      ...payload,
    });
  }

  async getListRanks(payload: GetListRanksDto): Promise<IPaginationRes<Rank>> {
    const { page, limit, sort } = payload;

    const options: any = {};

    if (sort) {
      options.order = [['pointsThreshold', sort]];
    }

    if (page && limit) {
      return await this.ranksRepository.paginate(options, page, limit);
    }
    return await this.ranksRepository.paginate(options, FIRST_PAGE, LIMIT_PAGE);
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
    // update user rank_id if needed
    await this.updateUserRank();
    return await this.ranksRepository.findOne({ where: [{ id }] });
  }

  async deleteRank(id: number): Promise<string> {
    const rank = await this.ranksRepository.findOne({ where: [{ id }] });
    if (!rank) {
      ErrorHelper.BadRequestException('rank not found');
    }
    await this.ranksRepository.delete({ where: [{ id }] });
    // update user rank_id if needed
    await this.updateUserRank();
    return 'delete successfully';
  }
}
