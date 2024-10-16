import { Injectable } from '@nestjs/common';
import { CreateRewardDto, GetListRewardsDto, UpdateRewardDto } from './dto';
import { Reward, Store } from 'src/database';
import { RewardsRepository } from './rewards.repository';
import { StoresRepository } from '../stores';
import { ErrorHelper } from 'src/utils';
import { IPaginationRes } from 'src/interfaces';
import { Op } from 'sequelize';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';

@Injectable()
export class RewardsService {
  constructor(
    private rewardsRepository: RewardsRepository,
    private storesRepository: StoresRepository,
  ) {}
  async createReward(
    id: number,
    payload: CreateRewardDto,
    imageUrl: string,
  ): Promise<Reward> {
    const store = await this.storesRepository.findOne({
      where: { id },
    });
    if (!store) {
      ErrorHelper.NotFoundException('store not found');
    }
    const { name } = payload;
    const reward = await this.rewardsRepository.findOne({
      where: { name, storeId: id },
    });
    if (reward) {
      ErrorHelper.BadRequestException('reward already exist in the store');
    }

    const newReward = await this.rewardsRepository.create({
      ...payload,
      storeId: id,
      imageUrl,
    });
    return newReward;
  }

  async getListRewards(
    payload: GetListRewardsDto,
  ): Promise<IPaginationRes<Reward>> {
    const { page, limit, name, sort, storeId } = payload;

    const filters: any = {};

    // search by name
    if (name) {
      filters.name = { [Op.iLike]: `%${name}%` };
    }

    // filter by storeId
    if (storeId) {
      filters.storeId = storeId;
    }

    const options: any = {
      where: filters,
    };

    // sort by pointsRequired
    if (sort) {
      options.order = [['pointsRequired', sort]];
    }

    if (page && limit) {
      return await this.rewardsRepository.paginate(options, page, limit);
    }

    return await this.rewardsRepository.paginate(
      options,
      FIRST_PAGE,
      LIMIT_PAGE,
    );
  }

  async getRewardDetails(id: number): Promise<Reward> {
    const reward = await this.rewardsRepository.findOne({
      where: { id },
      include: { model: Store, attributes: ['email', 'name'] },
      raw: true,
      nest: true,
    });
    if (!reward) {
      ErrorHelper.BadRequestException('reward not found');
    }
    return reward;
  }

  async updateReward(id: number, payload: UpdateRewardDto): Promise<Reward> {
    const user = await this.rewardsRepository.findOne({ where: [{ id }] });
    if (!user) {
      ErrorHelper.BadRequestException('user not found');
    }

    const { name, pointsRequired, quantity, expirationDate, description } =
      payload;
    const data: Partial<UpdateRewardDto> = {};
    if (name) data.name = name;
    if (pointsRequired) data.pointsRequired = pointsRequired;
    if (quantity) data.quantity = quantity;
    if (expirationDate) data.expirationDate = expirationDate;
    if (description) data.description = description;
    await this.rewardsRepository.update(data, { where: [{ id }] });
    return await this.rewardsRepository.findOne({
      where: [{ id }],
    });
  }

  async changeImage(
    storeId: number,
    id: number,
    imageUrl: string,
  ): Promise<Reward> {
    const reward = await this.rewardsRepository.findOne({
      where: { id, storeId },
    });
    if (!reward) {
      ErrorHelper.BadRequestException('reward not found in this store');
    }
    if (imageUrl !== null) {
      await this.rewardsRepository.update({ imageUrl }, { where: { id } });
    }
    return await this.rewardsRepository.findOne({ where: { id } });
  }

  async deleteReward(id: number): Promise<string> {
    const user = await this.rewardsRepository.findOne({ where: [{ id }] });
    if (!user) {
      ErrorHelper.BadRequestException('reward not found');
    }
    await this.rewardsRepository.delete({ where: [{ id }] });
    return 'delete successfully';
  }
}
