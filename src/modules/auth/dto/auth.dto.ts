import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  //   @IsMobilePhone('vi-VN')
  phone: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
    {
      message: 'password too weak',
    },
  )
  password: string;
}

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail({}, { message: 'invalid email format' })
  email: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
  )
  password: string;
}

export class StoreRegisterDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
    {
      message: 'password too weak',
    },
  )
  password: string;
}

export class UserLoginDTO {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
  )
  password: string;
}
