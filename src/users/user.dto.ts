import { IsString, IsEmail, IsNotEmpty, MaxLength, MinLength, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;
}
