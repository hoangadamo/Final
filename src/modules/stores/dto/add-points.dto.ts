import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class AddPointsDto {
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
