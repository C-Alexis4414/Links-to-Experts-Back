import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail } from 'class-validator';

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
}
