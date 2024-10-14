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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { CreateRewardDto, GetListRewardsDto, UpdateRewardDto } from './dto';
import { StoreGuard } from 'src/utils';
import { ICustomRequest } from 'src/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @UseGuards(StoreGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createReward(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: CreateRewardDto,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    console.log(file);
    const imageUrl = file ? `/uploads/${file.filename}` : null;
    return await this.rewardsService.createReward(storeId, payload, imageUrl);
  }

  @Get()
  async getListRewards(@Query() payload: GetListRewardsDto) {
    return this.rewardsService.getListRewards(payload);
  }

  @Get(':id')
  async getRewardDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.rewardsService.getRewardDetails(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRewardDto,
  ) {
    const user = await this.rewardsService.updateReward(id, payload);
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.rewardsService.deleteReward(id);
  }
}
