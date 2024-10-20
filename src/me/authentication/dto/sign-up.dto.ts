import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;
  @IsString()
  full_name: string;
  @MinLength(4)
  password: string;
  @MinLength(4)
  confirm_password: string;
}
