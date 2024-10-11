import { IsNotEmpty, Matches } from 'class-validator';
export class ChangePasswordDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
    {
      message: 'new password too weak',
    },
  )
  newPassword: string;

  @IsNotEmpty()
  confirmPassword: string;
}
