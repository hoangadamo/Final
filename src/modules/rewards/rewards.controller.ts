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
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('rewards')
@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @ApiOperation({ summary: 'API Create reward' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Reward creation payload',
    type: CreateRewardDto,
  }, )
  @UseGuards(StoreGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createReward(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: CreateRewardDto,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    const imageUrl = file ? `/uploads/${file.filename}` : null;
    return await this.rewardsService.createReward(storeId, payload, imageUrl);
  }

  @ApiOperation({ summary: 'API Get list of rewards' })
  @Get()
  async getListRewards(@Query() payload: GetListRewardsDto) {
    return this.rewardsService.getListRewards(payload);
  }

  @ApiOperation({ summary: 'API Get reward details' })
  @Get(':id')
  async getRewardDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.rewardsService.getRewardDetails(id);
  }

  @ApiOperation({ summary: 'API Update reward' })
  @Put(':id')
  async updateReward(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRewardDto,
  ) {
    const user = await this.rewardsService.updateReward(id, payload);
    return user;
  }

  @ApiOperation({ summary: 'API Change reward image' })
  @UseGuards(StoreGuard)
  @Put(':id/change-image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async changeImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    const imageUrl = file ? `/uploads/${file.filename}` : null;
    const user = await this.rewardsService.changeImage(storeId, id, imageUrl);
    return user;
  }

  @ApiOperation({ summary: 'API Delete reward' })
  @Delete(':id')
  async deleteReward(@Param('id', ParseIntPipe) id: number) {
    return await this.rewardsService.deleteReward(id);
  }
}
