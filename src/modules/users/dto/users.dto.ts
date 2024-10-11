import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class GetListUserDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  isVerify?: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  //   @IsMobilePhone('vi-VN')
  phone: string;
}

export class UpdatePointsDto {
  @IsNumber()
  @Min(0)
  points: boolean;
}
