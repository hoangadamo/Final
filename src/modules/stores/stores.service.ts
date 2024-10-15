import { Injectable } from '@nestjs/common';
import { Store, User, UserStore } from 'src/database';
import { ErrorHelper } from 'src/utils';
import { GetListStoresDto, UpdateStoreDto } from './dto';
import { IPaginationRes } from 'src/interfaces';
import { Op } from 'sequelize';
import { FIRST_PAGE, LIMIT_PAGE, STORE, USER } from 'src/constants';
import { UsersRepository } from '../users';
import {
  StoresRepository,
  TransactionsRepository,
  UsersStoresRepository,
} from './repositories';

@Injectable()
export class StoresService {
  constructor(
    private storesRepository: StoresRepository,
    private usersRepository: UsersRepository,
    private usersStoresRepository: UsersStoresRepository,
    private transactionsRepository: TransactionsRepository,
  ) {}

  async approve(id: number): Promise<Store> {
    const store = await this.storesRepository.findOne({ where: [{ id }] });
    if (!store) {
      ErrorHelper.NotFoundException('store not found');
    }

    // toggle the isApproved status
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
    const user = await this.storesRepository.findOne({ where: [{ id }] });
    if (!user) {
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

  async getListStoreUsers(id: number): Promise<User[]> {
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
    return await this.usersRepository.find({
      where: [{ id: userIds }],
      attributes: { exclude: ['password'] },
    });
  }

  async updateStore(id: number, payload: UpdateStoreDto): Promise<Store> {
    const user = await this.storesRepository.findOne({ where: [{ id }] });
    if (!user) {
      ErrorHelper.BadRequestException('user not found');
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
}
