import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RedemptionsService } from './redemptions.service';
import { UserGuard } from 'src/utils';
import { CreateRedemptionDto } from './dto';
import { ICustomRequest } from 'src/interfaces';

@Controller('redemptions')
export class RedemptionsController {
  constructor(private readonly redemptionsService: RedemptionsService) {}
  @UseGuards(UserGuard)
  @Post()
  async createRedemption(
    @Body() payload: CreateRedemptionDto,
    @Req() req: ICustomRequest,
  ) {
    const userId = req.user.id;
    return await this.redemptionsService.createRedemption(userId, payload);
  }
}
