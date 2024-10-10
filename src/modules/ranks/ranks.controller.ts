import { Body, Controller, Post } from '@nestjs/common';
import { RanksService } from './ranks.service';
import { CreateRankDTO } from './dto';

@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Post()
  async createRank(@Body() payload: CreateRankDTO) {
    return await this.ranksService.createRank(payload);
  }
}
