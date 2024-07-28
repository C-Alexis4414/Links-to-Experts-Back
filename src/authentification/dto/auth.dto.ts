import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, } from 'class-validator';

export class AuthPayloadDto {
    // @ApiProperty()
    // @IsString()
    // email: string;

    @ApiProperty()
    @IsString()
    userName: string;

    // @ApiProperty()
    // @IsInt()
    // id: number
}

export class AuthLoginDto {
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

