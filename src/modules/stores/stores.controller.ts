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
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { GetListStoresDto, UpdateStoreDto } from './dto';
import { StoreGuard } from 'src/utils';
import { ICustomRequest } from 'src/interfaces';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Put(':id')
  async updateStore(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStoreDto,
  ) {
    return await this.storesService.updateStore(id, payload);
  }

  @Put(':id/approve')
  async approve(@Param('id') id: number) {
    return this.storesService.approve(id);
  }

  @Get()
  async getListStores(@Query() payload: GetListStoresDto) {
    return await this.storesService.getListStores(payload);
  }

  @Get(':id')
  async getStoreDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.storesService.getStoreDetails(id);
  }

  @Delete(':id')
  async deleteStore(@Param('id', ParseIntPipe) id: number) {
    return await this.storesService.deleteStore(id);
  }

  @UseGuards(StoreGuard)
  @Post('users/:userId')
  async addUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    return await this.storesService.addUser(storeId, userId);
  }

  @UseGuards(StoreGuard)
  @Delete('users/:userId')
  async removeUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    return await this.storesService.removeUser(storeId, userId);
  }

  @UseGuards(StoreGuard)
  @Get('users/list')
  async getListStoreUsers(@Req() req: ICustomRequest) {
    const storeId = req.store.id;
    return await this.storesService.getListStoreUsers(storeId);
  }
}
