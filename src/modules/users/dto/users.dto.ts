import { IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

export class GetListUserDto extends PaginationDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  isVerify?: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  //   @IsMobilePhone('vi-VN')
  phone: string;
}

export class UpdatePointsDto {
  @IsNumber()
  @Min(0)
  points: boolean;
}
