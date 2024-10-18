import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'Nguyen Van A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Your email',
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Your phone',
    example: '0123456789',
  })
  @IsNotEmpty()
  //   @IsMobilePhone('vi-VN')
  phone: string;

  @ApiProperty({
    type: String,
    description: 'Your password',
    example: 'example@12345',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
    {
      message: 'password too weak',
    },
  )
  password: string;
}

export class LoginDTO {
  @ApiProperty({
    type: String,
    description: 'Your email',
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'invalid email format' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Your password',
    example: 'example@12345',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
  )
  password: string;
}

export class StoreRegisterDTO {
  @ApiProperty({
    type: String,
    description: 'Store name',
    example: 'Candy Store',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Store email',
    example: 'candystore@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Your password',
    example: 'example@12345',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
    {
      message: 'password too weak',
    },
  )
  password: string;
}

export class UserLoginDTO {
  @ApiProperty({
    type: String,
    description: 'Your phone',
    example: '0123456789',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'Your password',
    example: 'example@12345',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
  )
  password: string;
}
