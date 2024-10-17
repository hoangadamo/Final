import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RanksService } from './ranks.service';
import { CreateRankDTO, GetListRanksDto, UpdateRankDto } from './dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('ranks')
@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @ApiOperation({ summary: 'API Create rank' })
  @Post()
  async createRank(@Body() payload: CreateRankDTO) {
    return await this.ranksService.createRank(payload);
  }

  @ApiOperation({ summary: 'API Get list of ranks' })
  @Get()
  async getListRanks(@Query() payload: GetListRanksDto) {
    return await this.ranksService.getListRanks(payload);
  }

  @ApiOperation({ summary: 'API Get rank details' })
  @Get(':id')
  async getRankDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.ranksService.getRankDetails(id);
  }

  @ApiOperation({ summary: 'API Update rank' })
  @Put(':id')
  async updateRank(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRankDto,
  ) {
    return await this.ranksService.updateRank(id, payload);
  }

  @ApiOperation({ summary: 'API Delete rank' })
  @Delete(':id')
  async deleteRank(@Param('id', ParseIntPipe) id: number) {
    return await this.ranksService.deleteRank(id);
  }
}
