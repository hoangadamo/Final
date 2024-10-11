import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetListUserDto } from './dto';
import { UsersService } from './users.services';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getListUsers(@Query() payload: GetListUserDto) {
    return await this.usersService.getListUsers(payload);
  }

  @Get(':id')
  async getUserDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserDetails(id);
  }
}
