import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: 'Your current password',
    example: 'example@12345',
  })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    type: String,
    description: 'Your new password',
    example: 'example12345#',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // minlength: 8, atleast 1 lowercase, 1 uppercase, 1 number, 1 special character
    {
      message: 'new password too weak',
    },
  )
  newPassword: string;

  @ApiProperty({
    type: String,
    description: 'confirm new password',
    example: 'example12345#',
  })
  @IsNotEmpty()
  confirmPassword: string;
}
