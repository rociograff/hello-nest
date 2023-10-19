import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim()) //Para sacar los espacios en blanco
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim()) //Para sacar los espacios en blanco
  @IsString()
  @MinLength(6)
  password: string;
}
