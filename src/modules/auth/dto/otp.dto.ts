import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SendOTPDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsString()
  hash: string;
}

export class VerifyOTPDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}$/, { message: 'OTP must be a 4-digit number' })
  otp: string;

  @IsNotEmpty()
  @IsString()
  hash: string;
}
