import { Module } from '@nestjs/common';
import { RedemptionsService } from './redemptions.service';
import { RedemptionsController } from './redemptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rank, Redemption, Reward, User, UserStore } from 'src/database';
import { UsersRepository } from '../users';
import { RewardsRepository } from '../rewards';
import { UsersStoresRepository } from '../stores';
import { RanksRepository } from '../ranks';
import { RedemptionsRepository } from './redempttions.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Redemption, Reward, UserStore, Rank]),
  ],
  controllers: [RedemptionsController],
  providers: [
    RedemptionsService,
    RedemptionsRepository,
    UsersRepository,
    RewardsRepository,
    UsersStoresRepository,
    RanksRepository,
  ],
})
export class RedemptionsModule {}
