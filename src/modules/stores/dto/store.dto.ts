import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

export class GetListStoresDto extends PaginationDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  isVerify?: boolean;

  @IsOptional()
  isApproved?: boolean;
}

export class UpdateStoreDto {
  @ApiPropertyOptional({
    type: String,
    description: 'new store name',
    example: 'New Name',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'New email',
    example: 'newexample@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;
}

export class GetListStoreUsersDto extends PaginationDto {
  @ApiPropertyOptional({
    type: String,
    description: 'search by name',
    example: 'Nguyen Van A',
  })
  @IsOptional()
  name?: string;
}
