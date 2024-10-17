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
import {
  ChangePasswordDto,
  CreateTransactionDto,
  GetListStoresDto,
  GetListStoreUsersDto,
  GetListTransactionDto,
  UpdateStoreDto,
} from './dto';
import { StoreGuard } from 'src/utils';
import { ICustomRequest } from 'src/interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stores')
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

  @Put(':id/approval')
  async approve(@Param('id') id: number) {
    return this.storesService.approve(id);
  }

  @Put(':id/change-password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ChangePasswordDto,
  ) {
    return await this.storesService.changePassword(id, payload);
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
  async getListStoreUsers(
    @Req() req: ICustomRequest,
    @Query() payload: GetListStoreUsersDto,
  ) {
    const storeId = req.store.id;
    return await this.storesService.getListStoreUsers(storeId, payload);
  }

  // @UseGuards(StoreGuard)
  // @Post('users/:userId/points')
  // async addPoints(
  //   @Param('userId', ParseIntPipe) userId: number,
  //   @Req() req: ICustomRequest,
  //   @Body('point') point: number,
  // ) {
  //   const storeId = req.store.id;
  //   await this.storesService.AddPoints(storeId, userId, point);
  //   return 'add points successfully';
  // }

  @UseGuards(StoreGuard)
  @Post('users/:userId/points')
  async addPoints(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: ICustomRequest,
    @Body() payload: CreateTransactionDto,
  ) {
    const storeId = req.store.id;
    return await this.storesService.createTransaction(storeId, userId, payload);
  }

  @UseGuards(StoreGuard)
  @Get('transactions/list')
  async getListTransactions(
    @Query() payload: GetListTransactionDto,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    return await this.storesService.getListTransactions(storeId, payload);
  }

  @UseGuards(StoreGuard)
  @Get('transactions/:id')
  async getTransactionDetails(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    return await this.storesService.getTransactionnDetails(storeId, id);
  }
}
