import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class UserDataDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    userName?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    is_Youtuber?: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    is_Professional?: boolean;
}
