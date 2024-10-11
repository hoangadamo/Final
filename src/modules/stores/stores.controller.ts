import { Controller, Param, Put } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
  @Put(':id')
  async approve(@Param('id') id: number) {
    return this.storesService.approve(id);
  }
}
