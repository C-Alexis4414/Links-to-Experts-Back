import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    First_name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Last_Name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Password?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    Email_address?: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    Is_Youtuber?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    Is_Pro?: boolean;
}
