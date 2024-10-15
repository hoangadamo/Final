import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository, UserStore } from 'src/database';

@Injectable()
export class UsersStoresRepository extends BaseRepository<UserStore> {
  constructor(@InjectModel(UserStore) readonly model: typeof UserStore) {
    super(model);
  }
}
