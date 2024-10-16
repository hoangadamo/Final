import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GetListStoresDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

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
