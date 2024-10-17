import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

export class CreateTransactionDto {
  @ApiProperty({
    type: Number,
    description: ' user amount',
    example: 2500000,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    type: String,
    description: ' point type fixed or percentage',
    example: 'fixed',
  })
  @IsEnum(['fixed', 'percentage'], {
    message: 'pointType must be either fixed or percentage',
  })
  @IsNotEmpty()
  pointType: string;
}

export class GetListTransactionDto extends PaginationDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'Filter by user id',
    example: 7,
  })
  @IsOptional()
  userId?: number;
}
