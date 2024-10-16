import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(['fixed', 'percentage'], {
    message: 'pointType must be either fixed or percentage',
  })
  @IsNotEmpty()
  pointType: string;
}

export class GetListTransactionDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  userId?: number;
}
