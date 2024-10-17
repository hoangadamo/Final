import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RedemptionsService } from './redemptions.service';
import { UserGuard } from 'src/utils';
import { CreateRedemptionDto, GetListRedemptionsDto } from './dto';
import { ICustomRequest } from 'src/interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('redemptions')
@Controller('redemptions')
export class RedemptionsController {
  constructor(private readonly redemptionsService: RedemptionsService) {}

  @ApiOperation({ summary: 'API Create redemption' })
  @UseGuards(UserGuard)
  @Post()
  async createRedemption(
    @Body() payload: CreateRedemptionDto,
    @Req() req: ICustomRequest,
  ) {
    const userId = req.user.id;
    return await this.redemptionsService.createRedemption(userId, payload);
  }

  @ApiOperation({ summary: 'API Get list of redemptions' })
  @Get()
  async getListRedemptions(@Query() payload: GetListRedemptionsDto) {
    return await this.redemptionsService.getListRedemptions(payload);
  }

  @ApiOperation({ summary: 'API Redemption details' })
  @Get(':id')
  async getRedemptionDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.redemptionsService.getRedemptionDetails(id);
  }
}
