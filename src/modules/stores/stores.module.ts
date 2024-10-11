import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Store } from 'src/database/entities/stores.model';
import { StoresRepository } from './stores.repository';

@Module({
  imports: [SequelizeModule.forFeature([Store])],
  controllers: [StoresController],
  providers: [StoresService, StoresRepository],
})
export class StoresModule {}
