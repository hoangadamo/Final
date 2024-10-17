import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

export class GetListUserDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Name of the user to filter by' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by verification status' })
  @IsOptional()
  isVerify?: boolean;
}

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'Nguyen Van A',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Your email',
    example: 'example@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Your phone',
    example: '0123456789',
  })
  @IsOptional()
  //   @IsMobilePhone('vi-VN')
  phone: string;
}
