import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Store } from 'src/database/entities/stores.model';
import { StoresRepository } from './repositories/stores.repository';
import { UsersRepository } from '../users';
import { Transaction, User, UserStore } from 'src/database';
import { UsersStoresRepository } from './repositories/user-store.repository';
import { TransactionsRepository } from './repositories';

@Module({
  imports: [SequelizeModule.forFeature([Store, User, UserStore, Transaction])],
  controllers: [StoresController],
  providers: [
    StoresService,
    StoresRepository,
    UsersRepository,
    UsersStoresRepository,
    TransactionsRepository,
  ],
})
export class StoresModule {}
