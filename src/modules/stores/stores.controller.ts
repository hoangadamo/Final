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
import { AdminGuard, StoreGuard } from 'src/utils';
import { ICustomRequest } from 'src/interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({ summary: 'API Update store' })
  @Put(':id')
  async updateStore(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStoreDto,
  ) {
    return await this.storesService.updateStore(id, payload);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'API Admin approve store' })
  @Put(':id/approval')
  async approve(@Param('id') id: number) {
    return this.storesService.approve(id);
  }

  @ApiOperation({ summary: 'API change password store' })
  @Put(':id/change-password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ChangePasswordDto,
  ) {
    return await this.storesService.changePassword(id, payload);
  }

  @ApiOperation({ summary: 'API get list of store' })
  @Get()
  async getListStores(@Query() payload: GetListStoresDto) {
    return await this.storesService.getListStores(payload);
  }

  @ApiOperation({ summary: 'API get store details' })
  @Get(':id')
  async getStoreDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.storesService.getStoreDetails(id);
  }

  @ApiOperation({ summary: 'API delete store' })
  @Delete(':id')
  async deleteStore(@Param('id', ParseIntPipe) id: number) {
    return await this.storesService.deleteStore(id);
  }

  @ApiOperation({ summary: 'API add user to store' })
  @UseGuards(StoreGuard)
  @Post('users/:userId')
  async addUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    return await this.storesService.addUser(storeId, userId);
  }

  @ApiOperation({ summary: 'API remove user from store' })
  @UseGuards(StoreGuard)
  @Delete('users/:userId')
  async removeUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    return await this.storesService.removeUser(storeId, userId);
  }

  @ApiOperation({ summary: 'API get list of store users' })
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

  @ApiOperation({ summary: 'API store add points to user' })
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

  @ApiOperation({ summary: 'API get list of transactions' })
  @UseGuards(StoreGuard)
  @Get('transactions/list')
  async getListTransactions(
    @Query() payload: GetListTransactionDto,
    @Req() req: ICustomRequest,
  ) {
    const storeId = req.store.id;
    return await this.storesService.getListTransactions(storeId, payload);
  }

  @ApiOperation({ summary: 'API get transation details' })
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
