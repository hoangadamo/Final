import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { GetListStoresDto } from './dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
  @Put(':id')
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
}
