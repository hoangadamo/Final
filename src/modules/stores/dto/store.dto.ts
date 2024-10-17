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
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}

export class GetListStoreUsersDto extends PaginationDto {
  @IsOptional()
  name?: string;
}
