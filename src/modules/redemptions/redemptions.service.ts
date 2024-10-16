import { Injectable } from '@nestjs/common';
import { CreateRedemptionDto, GetListRedemptionsDto } from './dto';
import { Redemption } from 'src/database';
import { RewardsRepository } from '../rewards';
import { ErrorHelper } from 'src/utils';
import { UsersStoresRepository } from '../stores';
import { RanksRepository } from '../ranks';
import { RedemptionsRepository } from './redempttions.repository';
import { UsersRepository } from '../users';
import { FIRST_PAGE, LIMIT_PAGE, MAX_POINT } from 'src/constants';
import { IPaginationRes } from 'src/interfaces';
import { Op } from 'sequelize';

@Injectable()
export class RedemptionsService {
  constructor(
    private usersRepository: UsersRepository,
    private redemptionsRepository: RedemptionsRepository,
    private rewardsRepository: RewardsRepository,
    private usersStoresRepository: UsersStoresRepository,
    private ranksRepository: RanksRepository,
  ) {}
  async createRedemption(
    userId: number,
    payload: CreateRedemptionDto,
  ): Promise<Redemption> {
    const { rewardId, quantity } = payload;
    const reward = await this.rewardsRepository.findOne({
      where: { id: rewardId },
    });
    if (!reward) {
      ErrorHelper.NotFoundException('reward not found');
    }
    const storeId = reward.storeId;

    const user = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });
    if (!user) {
      ErrorHelper.NotFoundException('user not found');
    }

    const userStore = await this.usersStoresRepository.findOne({
      where: { userId, storeId },
    });
    if (!userStore) {
      ErrorHelper.NotFoundException('user has not been added to the store');
    }

    // valid total point
    const totalPoint = reward.pointsRequired * quantity;
    if (totalPoint > user.points) {
      ErrorHelper.BadRequestException('not enough points to redeem');
    }
    if (totalPoint > MAX_POINT) {
      ErrorHelper.BadRequestException('exceed maximum redeemable points');
    }

    const newRedeption = await this.redemptionsRepository.create({
      userId,
      rewardName: reward.name,
      quantity,
      pointsDeducted: totalPoint,
      redemptionDate: new Date(),
    });

    // update user point and rank
    const newPoints = user.points - totalPoint;
    await this.usersRepository.update(
      { points: newPoints },
      { where: [{ id: userId }] },
    );

    // update rank_id if needed:
    const ranks = await this.ranksRepository.find({
      order: [['pointsThreshold', 'DESC']],
    });
    for (const rank of ranks) {
      if (newPoints >= rank.pointsThreshold) {
        await this.usersRepository.update(
          { rankId: rank.id },
          { where: [{ id: userId }] },
        );
        break;
      }
    }
    return newRedeption;
  }

  async getListRedemptions(
    payload: GetListRedemptionsDto,
  ): Promise<IPaginationRes<Redemption>> {
    const { page, limit, rewardName, userId } = payload;

    const filters: any = {};

    // filter by userId
    if (userId) {
      filters.userId = userId;
    }

    // search by rewardName
    if (rewardName) {
      filters.rewardName = { [Op.iLike]: `%${rewardName}%` };
    }

    const options = {
      where: filters,
    };

    if (page && limit) {
      return await this.redemptionsRepository.paginate(options, page, limit);
    }

    return await this.redemptionsRepository.paginate(
      options,
      FIRST_PAGE,
      LIMIT_PAGE,
    );
  }

  async getRedemptionDetails(id: number): Promise<Redemption> {
    const redemption = await this.redemptionsRepository.findOne({
      where: { id },
    });
    if (!redemption) {
      ErrorHelper.BadRequestException('redemption not found');
    }
    return redemption;
  }
}
