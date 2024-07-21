import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsOptional, IsInt } from 'class-validator';

export class TagDto {

    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsInt()
    categoryId: number;

}