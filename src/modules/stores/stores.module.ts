import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Store } from 'src/database/entities/stores.model';
import { StoresRepository } from './stores.repository';
import { UsersRepository } from '../users';
import { User, UserStore } from 'src/database';
import { UsersStoresRepository } from './user-store.repository';

@Module({
  imports: [SequelizeModule.forFeature([Store, User, UserStore])],
  controllers: [StoresController],
  providers: [
    StoresService,
    StoresRepository,
    UsersRepository,
    UsersStoresRepository,
  ],
})
export class StoresModule {}
