import { Injectable } from '@nestjs/common';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';
import { IPaginationRes } from 'src/interfaces';

import { GetListUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users.repository';
import { User } from 'src/database';
import { Op, where } from 'sequelize';
import { ErrorHelper } from 'src/utils';
import * as bcrypt from 'bcrypt';

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

    const options = {
      where: filters,
      attributes: { exclude: ['password'] }, // Exclude the password field
    };

    if (page && limit) {
      return await this.usersRepository.paginate(options, page, limit);
    }

    return await this.usersRepository.paginate(options, FIRST_PAGE, LIMIT_PAGE);
  }

  async getUserDetails(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: [{ id }] });
    if (!user) {
      ErrorHelper.BadRequestException('user not found');
    }
    delete user.password;
    return user;
  }

  async updateUser(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: [{ id }] });
    if (!user) {
      ErrorHelper.BadRequestException('user not found');
    }

    const { name, email, phone, password } = payload;
    const data: any = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (phone) data.phone = phone;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      data.password = hashed;
    }
    await this.usersRepository.update(data, { where: [{ id }] });
    return await this.usersRepository.findOne({ where: [{ id }] });
  }

  async deleteUser(id: number): Promise<string> {
    const user = await this.usersRepository.findOne({ where: [{ id }] });
    if (!user) {
      ErrorHelper.BadRequestException('user not found');
    }
    await this.usersRepository.delete({ where: [{ id }] });
    return 'delete successfully';
  }
}
