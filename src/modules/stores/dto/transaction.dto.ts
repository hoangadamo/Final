import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

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

export class GetListTransactionDto extends PaginationDto {
  @IsOptional()
  userId?: number;
}
