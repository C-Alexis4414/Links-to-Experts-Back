import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsOptional, IsInt } from 'class-validator';


export class CategoryDto {
    // @ApiProperty()
    // @IsInt()
    // id: number;

    @ApiProperty()
    @IsString()
    name: string;
}