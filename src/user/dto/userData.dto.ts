import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    userName: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsBoolean()
    is_Youtuber: boolean;

    @ApiProperty()
    @IsBoolean()
    is_Professional: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    tagChannel?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    urlLinkedin?: string;
}

export class UserIsYoutuber {
    @ApiProperty()
    @IsString()
    @IsOptional()
    tagChannel?: string;
}

export class LinkedinDto {
    @ApiProperty()
    @IsString()
    userName: string;

}