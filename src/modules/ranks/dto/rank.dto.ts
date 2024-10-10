import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRankDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  pointsThreshold: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  fixedPoint: number;

  @IsNotEmpty()
  @IsNumber()
  percentage: number;

  @IsNotEmpty()
  @IsNumber()
  maxPercentagePoints: number;
}
