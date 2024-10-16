import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

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
