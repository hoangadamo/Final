import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RanksService } from './ranks.service';
import { CreateRankDTO, GetListRanksDto, UpdateRankDto } from './dto';

@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Post()
  async createRank(@Body() payload: CreateRankDTO) {
    return await this.ranksService.createRank(payload);
  }

  @Get()
  async getListRanks(@Query() payload: GetListRanksDto) {
    return await this.ranksService.getListRanks(payload);
  }

  @Get(':id')
  async getRankDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.ranksService.getRankDetails(id);
  }

  @Put(':id')
  async updateRank(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRankDto,
  ) {
    return await this.ranksService.updateRank(id, payload);
  }
}
