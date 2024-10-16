import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Store } from 'src/database/entities/stores.model';
import { StoresRepository } from './repositories/stores.repository';
import { UsersRepository } from '../users';
import { Rank, Transaction, User, UserStore } from 'src/database';
import { UsersStoresRepository } from './repositories/user-store.repository';
import { TransactionsRepository } from './repositories';
import { RanksRepository } from '../ranks';

@Module({
  imports: [
    SequelizeModule.forFeature([Store, User, UserStore, Transaction, Rank]),
  ],
  controllers: [StoresController],
  providers: [
    StoresService,
    StoresRepository,
    UsersRepository,
    UsersStoresRepository,
    TransactionsRepository,
    RanksRepository,
  ],
})
export class StoresModule {}
