import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsEnum, IsDate } from 'class-validator';
import { Role } from 'src/enum/role.enum';



export class RegisterDto {
    @ApiProperty()
    @IsString()
    First_name: string;

    @ApiProperty()
    @IsString()
    Last_Name: string;

    @ApiProperty()
    @IsString()
    Username: string;

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

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    updatedAt: Date;
}
