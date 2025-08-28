import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    full_name?: string;

    @IsPhoneNumber('VN')
    phone_number?: string;

    @IsString()
    @IsEmail()
    email?: string;
}