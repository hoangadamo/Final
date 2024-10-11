import { Injectable } from '@nestjs/common';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';
import { IPaginationRes } from 'src/interfaces';

import { ChangePasswordDto, GetListUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users.repository';
import { User } from 'src/database';
import { Op } from 'sequelize';
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

    const { name, email, phone } = payload;
    const data: any = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (phone) data.phone = phone;
    await this.usersRepository.update(data, { where: [{ id }] });
    return await this.usersRepository.findOne({
      where: [{ id }],
      attributes: { exclude: ['password'] },
    });
  }

  async changePassword(
    id: number,
    payload: ChangePasswordDto,
  ): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new ErrorHelper.BadRequestException('user not found');
    }

    const { currentPassword, newPassword, confirmPassword } = payload;
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
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

    await this.usersRepository.update(
      { password: hashed },
      { where: [{ id }] },
    );

    return 'update password successful';
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
