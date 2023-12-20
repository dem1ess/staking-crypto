import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: 'Пароль должен больше 7 символов' })
  password: string;

  role: string;
}
