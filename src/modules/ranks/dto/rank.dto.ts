import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateRankDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'fixedPoint must be a non-negative number' })
  pointsThreshold: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(50000, { message: 'amount must be greater than 50000' })
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'amount must be a non-negative number' })
  fixedPoint: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'percentage must be a non-negative number' })
  percentage: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'maxPercentagePoints must be a non-negative number' })
  maxPercentagePoints: number;
}

export class GetListRanksDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  sort?: 'ASC' | 'DESC';
}

export class UpdateRankDto extends PartialType(CreateRankDTO) {}