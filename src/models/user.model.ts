import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDTO {
    @IsEmail() 
    @IsString()
    @MinLength(4)
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}

export class RegisterUserDTO extends LoginUserDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
}

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    image: string;

    @IsOptional()
    bio: string;
}

export interface AuthPayload{
    username: string;
}