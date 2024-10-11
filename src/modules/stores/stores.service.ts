import { Injectable } from '@nestjs/common';
import { Store } from 'src/database';
import { StoresRepository } from './stores.repository';
import { ErrorHelper } from 'src/utils';
import { GetListStoresDto } from './dto';
import { IPaginationRes } from 'src/interfaces';
import { Op } from 'sequelize';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';

@Injectable()
export class StoresService {
  constructor(private storesRepository: StoresRepository) {}

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
      filters.name = { [Op.like]: `%${name}%` };
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
}
