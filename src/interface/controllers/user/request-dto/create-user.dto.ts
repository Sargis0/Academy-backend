import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength
} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    phone: number;

    @IsEmail({}, {message: "Email must be a valid email address"})
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, {message: "Password must be at least 6 characters"})
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsBoolean()
    isVisible: string

    @IsOptional()
    @IsBoolean()
    isActive: string
}
