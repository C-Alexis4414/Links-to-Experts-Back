import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsOptional, IsInt } from 'class-validator';

export class TagDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsInt()
    categoryId: number;

}