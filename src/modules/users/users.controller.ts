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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ChangePasswordDto, GetListUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.services';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'API Get list of users' })
  @Get()
  async getListUsers(@Query() payload: GetListUserDto) {
    return await this.usersService.getListUsers(payload);
  }

  @ApiOperation({ summary: 'API User details' })
  @Get(':id')
  async getUserDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserDetails(id);
  }

  @ApiOperation({ summary: 'API Update user' })
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    const user = await this.usersService.updateUser(id, payload);
    return user;
  }

  @ApiOperation({ summary: 'API Change password user' })
  @Put(':id/change-password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ChangePasswordDto,
  ) {
    return await this.usersService.changePassword(id, payload);
  }

  @ApiOperation({ summary: 'API Delete user' })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }
}
