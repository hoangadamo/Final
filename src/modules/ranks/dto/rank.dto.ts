import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

export class CreateRankDTO {
  @ApiProperty({
    type: String,
    description: 'Rank name',
    example: 'Gold',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Rank points threshold',
    example: 5000,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'pointsThreshold must be a non-negative number' })
  pointsThreshold: number;

  @ApiProperty({
    type: Number,
    description: ' fixed amount of rank',
    example: 100000,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(50000, { message: 'amount must be greater than 50000' })
  amount: number;

  @ApiProperty({
    type: Number,
    description: ' fixed point of rank',
    example: 15,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'fixedPoint must be a non-negative number' })
  fixedPoint: number;

  @ApiProperty({
    type: Number,
    description: ' percentage of rank',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'percentage must be a non-negative number' })
  @Max(100, { message: 'maximum percentage is 100' })
  percentage: number;

  @ApiProperty({
    type: Number,
    description: 'maxPercentagePoints of rank',
    example: 200,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'maxPercentagePoints must be a non-negative number' })
  maxPercentagePoints: number;
}

export class GetListRanksDto extends PaginationDto {
  @ApiPropertyOptional({ type: String, description: 'Sort', example: 'ASC' })
  @IsOptional()
  sort?: 'ASC' | 'DESC';
}

export class UpdateRankDto extends PartialType(CreateRankDTO) {}
