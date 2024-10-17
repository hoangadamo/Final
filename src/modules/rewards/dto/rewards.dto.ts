import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinDate,
} from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

export class CreateRewardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'pointsRequired must be a non-negative number' })
  pointsRequired: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MinDate(new Date(), { message: 'Expiration date must be in the future' })
  expirationDate: Date;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'quantity must be a non-negative number' })
  quantity: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class GetListRewardsDto extends PaginationDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  storeId?: number;
}

export class UpdateRewardDto extends PartialType(CreateRewardDto) {}
