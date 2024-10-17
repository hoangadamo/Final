import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

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

export class GetListRedemptionsDto extends PaginationDto {
  @IsOptional()
  rewardName?: string;

  @IsOptional()
  userId?: number;
}
