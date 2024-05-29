import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    First_name: string;

    @ApiProperty()
    @IsString()
    Last_Name: string;

    @ApiProperty()
    @IsString()
    Password: string;

    @ApiProperty()
    @IsEmail()
    Email_address: string;

    @ApiProperty()
    @IsBoolean()
    Is_Youtuber: boolean;

    @ApiProperty()
    @IsBoolean()
    Is_Pro: boolean;
}
