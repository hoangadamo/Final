import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    type: String,
    description: 'reward name',
    example: 'Sample Reward',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'reward points required',
    example: 200,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'pointsRequired must be a non-negative number' })
  pointsRequired: number;

  @ApiProperty({
    type: Date,
    description: 'expiration date of reward',
    example: '2025-01-01',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MinDate(new Date(), { message: 'Expiration date must be in the future' })
  expirationDate: Date;

  @ApiProperty({
    type: Number,
    description: 'reward quantity',
    example: 10,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'quantity must be a non-negative number' })
  quantity: number;

  @ApiPropertyOptional({
    type: String,
    description: 'reward desciption',
    example: 'This is description for reward',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class GetListRewardsDto extends PaginationDto {
  @ApiPropertyOptional({
    type: String,
    description: 'search by name',
    example: 'Sample',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, description: 'Sort', example: 'ASC' })
  @IsOptional()
  sort?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    type: Number,
    description: 'Filter by store id',
    example: 9,
  })
  @IsOptional()
  storeId?: number;
}

export class UpdateRewardDto extends PartialType(CreateRewardDto) {}
