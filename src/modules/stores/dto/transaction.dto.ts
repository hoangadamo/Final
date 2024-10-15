import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';

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
