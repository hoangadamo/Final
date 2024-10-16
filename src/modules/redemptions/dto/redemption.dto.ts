import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateRedemptionDto {
  @IsNotEmpty()
  @IsNumber()
  rewardId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3)
  quantity: number;
}

export class GetListRedemptionsDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  userId?: number;
}
