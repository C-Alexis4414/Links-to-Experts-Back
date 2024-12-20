import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class TagDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsInt()
    categoryId: number;

    @ApiProperty()
    @IsInt()
    userId: number;

}