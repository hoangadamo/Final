import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(10)
  phone: string;

  @MinLength(8)
  password: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
