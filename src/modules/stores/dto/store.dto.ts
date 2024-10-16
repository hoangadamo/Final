import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GetListStoresDto {
  @IsOptional()
  page?: number;

  @IsOptional()
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