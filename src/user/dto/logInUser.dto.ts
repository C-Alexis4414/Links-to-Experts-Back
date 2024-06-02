import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsEnum, IsDate } from 'class-validator';


export class LogInUserDto {
    @ApiProperty()
    @IsString()
    Username: string;

    @ApiProperty()
    @IsString()
    Password: string;

    @ApiProperty()
    @IsEmail()
    Email_address: string;

}