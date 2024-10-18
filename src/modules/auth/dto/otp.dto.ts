import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SendOTPDto {
  @ApiProperty({
    type: String,
    description: 'Email needs to be verified',
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'invalid email format' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Hash string',
    example: 'f747f25e53a31589dccfbbd0b48a6a59',
  })
  @IsNotEmpty()
  @IsString()
  hash: string;
}

export class VerifyOTPDto {
  @ApiProperty({
    type: String,
    description: 'OTP',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}$/, { message: 'OTP must be a 4-digit number' })
  otp: string;

  @ApiProperty({
    type: String,
    description: 'Hash string',
    example:
      'U2FsdGVkX187eCOft4ynUDtiJ6uxnpt4zn7DdY9hOonkvassKGv6TPlZFtneCw/pa3iRJeoZxyPUA35+GSQk9Eb6ipM2Ys2mKz36SrAMZVtCIMyNgrWQFW9qvCi9u2NTrMPBlmi1RBzu1AXRjl41jw==',
  })
  @IsNotEmpty()
  @IsString()
  hash: string;
}
