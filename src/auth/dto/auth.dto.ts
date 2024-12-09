import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  name?: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class signDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
