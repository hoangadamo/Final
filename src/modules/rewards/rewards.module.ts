import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reward, Store } from 'src/database';
import { RewardsRepository } from './rewards.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StoresRepository } from '../stores';

@Module({
  imports: [
    SequelizeModule.forFeature([Reward, Store]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [RewardsController],
  providers: [RewardsService, RewardsRepository, StoresRepository],
})
export class RewardsModule {}
