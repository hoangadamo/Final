import { Injectable } from '@nestjs/common';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';
import { IPaginationRes } from 'src/interfaces';

import { GetListUserDto } from './dto';
import { UsersRepository } from './users.repository';
import { User } from 'src/database';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getListUsers(payload: GetListUserDto): Promise<IPaginationRes<User>> {
    const { page, limit, isVerify, name } = payload;

    const filters: any = {};

    // filter by isVerify
    if (isVerify !== undefined) {
      filters.isVerify = isVerify;
    }

    // search by name
    if (name) {
      filters.name = { [Op.like]: `%${name}%` };
    }

    if (page && limit) {
      return await this.usersRepository.paginate(
        { where: filters },
        page,
        limit,
      );
    }

    return await this.usersRepository.paginate(
      { where: filters },
      FIRST_PAGE,
      LIMIT_PAGE,
    );
  }
}
