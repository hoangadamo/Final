import { Module } from '@nestjs/common';
import { RanksService } from './ranks.service';
import { RanksController } from './ranks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RanksRepository } from './ranks.repository';
import { UsersRepository } from '../users';
import { Rank, User } from 'src/database';

@Module({
  imports: [SequelizeModule.forFeature([Rank, User])],
  controllers: [RanksController],
  providers: [RanksService, RanksRepository, UsersRepository],
})
export class RanksModule {}
