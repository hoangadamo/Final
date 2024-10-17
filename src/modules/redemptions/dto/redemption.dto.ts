import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

export class CreateRedemptionDto {
  @ApiProperty({
    type: Number,
    description: 'rewardId',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  rewardId: number;

  @ApiProperty({
    type: Number,
    description: 'quantity',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3)
  quantity: number;
}

export class GetListRedemptionsDto extends PaginationDto {
  @ApiPropertyOptional({
    type: String,
    description: 'reward name',
    example: 'Sample',
  })
  @IsOptional()
  rewardName?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'filter by user id',
    example: 1,
  })
  @IsOptional()
  userId?: number;
}
