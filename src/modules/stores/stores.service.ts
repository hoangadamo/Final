import { Injectable } from '@nestjs/common';
import { Store, Transaction, User, UserStore } from 'src/database';
import { ErrorHelper } from 'src/utils';
import {
  ChangePasswordDto,
  CreateTransactionDto,
  GetListStoresDto,
  GetListStoreUsersDto,
  GetListTransactionDto,
  UpdateStoreDto,
} from './dto';
import { IPaginationRes } from 'src/interfaces';
import { Op } from 'sequelize';
import { EPointType, FIRST_PAGE, LIMIT_PAGE, STORE, USER } from 'src/constants';
import { UsersRepository } from '../users';
import {
  StoresRepository,
  TransactionsRepository,
  UsersStoresRepository,
} from './repositories';
import * as bcrypt from 'bcrypt';
import { RanksRepository } from '../ranks';

@Injectable()
export class StoresService {
  constructor(
    private storesRepository: StoresRepository,
    private usersRepository: UsersRepository,
    private usersStoresRepository: UsersStoresRepository,
    private transactionsRepository: TransactionsRepository,
    private ranksRepository: RanksRepository,
  ) {}

  async approve(id: number): Promise<Store> {
    const store = await this.storesRepository.findOne({ where: [{ id }] });
    if (!store) {
      ErrorHelper.NotFoundException('store not found');
    }

    // check if store is verified
    if (!store.isVerify) {
      ErrorHelper.BadRequestException('store email has not been verified');
    }

    const newStatus = !store.isApproved;
    await this.storesRepository.update(
      { isApproved: newStatus },
      { where: [{ id }] },
    );

    return await this.storesRepository.findOne({
      where: [{ id }],
      attributes: { exclude: ['password'] },
    });
  }

  async getListStores(
    payload: GetListStoresDto,
  ): Promise<IPaginationRes<Store>> {
    const { page, limit, name, isVerify, isApproved } = payload;

    const filters: any = {};

    // filter by isVerify
    if (isVerify !== undefined) {
      filters.isVerify = isVerify;
    }

    // filter by isApproved
    if (isApproved !== undefined) {
      filters.isApproved = isApproved;
    }

    // search by name
    if (name) {
      filters.name = { [Op.iLike]: `%${name}%` };
    }

    const options = {
      where: filters,
      attributes: { exclude: ['password'] }, // Exclude the password field
    };

    if (page && limit) {
      return await this.storesRepository.paginate(options, page, limit);
    }

    return await this.storesRepository.paginate(
      options,
      FIRST_PAGE,
      LIMIT_PAGE,
    );
  }

  async getStoreDetails(id: number): Promise<Store> {
    const store = await this.storesRepository.findOne({ where: [{ id }] });
    if (!store) {
      ErrorHelper.BadRequestException('store not found');
    }
    delete store.password;
    return store;
  }

  async deleteStore(id: number): Promise<string> {
    const store = await this.storesRepository.findOne({ where: [{ id }] });
    if (!store) {
      ErrorHelper.BadRequestException('store not found');
    }
    await this.storesRepository.delete({ where: [{ id }] });
    return 'delete successfully';
  }

  async addUser(id: number, userId: number): Promise<UserStore> {
    const user = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });
    if (!user) {
      ErrorHelper.NotFoundException(USER.USER_NOT_FOUND);
    }

    const store = await this.storesRepository.findOne({
      where: [{ id }],
    });
    if (!store) {
      ErrorHelper.NotFoundException(STORE.STORE_NOT_FOUND);
    }
    const userStore = await this.usersStoresRepository.findOne({
      where: [{ storeId: id, userId: userId }],
    });
    if (userStore) {
      ErrorHelper.BadRequestException('user has been added to the store');
    }
    const newUserStore = await this.usersStoresRepository.create({
      storeId: id,
      userId: userId,
    });
    return newUserStore;
  }

  async removeUser(id: number, userId: number): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });
    if (!user) {
      ErrorHelper.NotFoundException(USER.USER_NOT_FOUND);
    }

    const store = await this.storesRepository.findOne({
      where: [{ id }],
    });
    if (!store) {
      ErrorHelper.NotFoundException(STORE.STORE_NOT_FOUND);
    }

    const userStore = await this.usersStoresRepository.findOne({
      where: [{ storeId: id, userId: userId }],
    });
    if (!userStore) {
      ErrorHelper.BadRequestException('user has not been added to the store');
    }

    await this.usersStoresRepository.delete({ where: [{ id: userStore.id }] });

    return 'successfully remove user from the store';
  }

  async getListStoreUsers(
    id: number,
    payload: GetListStoreUsersDto,
  ): Promise<IPaginationRes<User>> {
    const store = await this.storesRepository.findOne({
      where: [{ id }],
    });
    if (!store) {
      ErrorHelper.NotFoundException(STORE.STORE_NOT_FOUND);
    }

    const userStores = await this.usersStoresRepository.find({
      where: [{ storeId: id }],
    });
    const userIds = userStores.map((userStore) => userStore.userId);
    const { page, limit, name } = payload;
    const filters: any = {};

    // search by name
    if (name) {
      filters.name = { [Op.iLike]: `%${name}%` };
    }

    const options = {
      where: [filters, { id: userIds }],
      attributes: { exclude: ['password'] },
    };
    if (page && limit) {
      return await this.usersRepository.paginate(options, page, limit);
    }

    return await this.usersRepository.paginate(options, FIRST_PAGE, LIMIT_PAGE);
  }

  async updateStore(id: number, payload: UpdateStoreDto): Promise<Store> {
    const store = await this.storesRepository.findOne({ where: [{ id }] });
    if (!store) {
      ErrorHelper.BadRequestException('store not found');
    }

    const { name, email } = payload;
    const data: Partial<UpdateStoreDto> = {};
    if (name) data.name = name;
    if (email) data.email = email;
    await this.storesRepository.update(data, { where: [{ id }] });
    return await this.storesRepository.findOne({
      where: [{ id }],
      attributes: { exclude: ['password'] },
    });
  }

  async changePassword(
    id: number,
    payload: ChangePasswordDto,
  ): Promise<string> {
    const store = await this.storesRepository.findOne({ where: { id } });
    if (!store) {
      throw new ErrorHelper.BadRequestException('store not found');
    }

    const { currentPassword, newPassword, confirmPassword } = payload;
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      store.password,
    );
    if (!isValidPassword) {
      ErrorHelper.BadRequestException('current password is incorrect');
    }

    if (newPassword !== confirmPassword) {
      ErrorHelper.BadRequestException(
        'new password and confirmation password do not match',
      );
    }

    if (currentPassword === newPassword) {
      ErrorHelper.BadRequestException(
        'new password must be different from the current password',
      );
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await this.storesRepository.update(
      { password: hashed },
      { where: [{ id }] },
    );

    return 'update password successful';
  }

  async AddPoints(userId: number, point: number): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });

    const newPoints = user.points + point;

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
  }

  async createTransaction(
    storeId: number,
    userId: number,
    payload: CreateTransactionDto,
  ): Promise<Transaction> {
    const { amount, pointType } = payload;

    const user = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });
    if (!user) {
      ErrorHelper.NotFoundException(USER.USER_NOT_FOUND);
    }

    const userStore = await this.usersStoresRepository.findOne({
      where: [{ storeId, userId }],
    });
    if (!userStore) {
      ErrorHelper.BadRequestException('user has not been added to the store');
    }

    const rank = await this.ranksRepository.findOne({
      where: [{ id: user.rankId }],
    });

    let point = 0;

    if (pointType === EPointType.FIX) {
      point = Math.floor(amount / rank.amount) * rank.fixedPoint;
    } else {
      point = Math.min(
        Math.floor((amount / 1000) * rank.percentage),
        rank.maxPercentagePoints,
      );
    }

    await this.AddPoints(userId, point);
    return await this.transactionsRepository.create({
      ...payload,
      userId,
      storeId,
      pointsEarned: point,
      transactionDate: new Date(),
    });
  }

  async getListTransactions(
    storeId: number,
    payload: GetListTransactionDto,
  ): Promise<IPaginationRes<Transaction>> {
    const { page, limit, userId } = payload;

    const filters: any = {};
    filters.storeId = storeId;

    // filter by userId
    if (userId) {
      filters.userId = userId;
    }

    const options = {
      where: filters,
    };

    if (page && limit) {
      return await this.transactionsRepository.paginate(options, page, limit);
    }

    return await this.transactionsRepository.paginate(
      options,
      FIRST_PAGE,
      LIMIT_PAGE,
    );
  }

  async getTransactionnDetails(
    storeId: number,
    transactionId: number,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id: transactionId, storeId },
    });
    if (!transaction) {
      ErrorHelper.BadRequestException('transaction not found in the store');
    }
    return transaction;
  }
}
