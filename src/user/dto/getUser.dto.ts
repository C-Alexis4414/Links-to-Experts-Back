import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class UserDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsString()
    First_name: string;

    @ApiProperty()
    @Expose()
    @IsString()
    Last_Name: string;

    @ApiProperty()
    @Expose()
    @IsString()
    Username: string;

    @Exclude({ toPlainOnly: true })
    @IsString()
    Password: string;

    @ApiProperty()
    @IsString()
    Salt: string;

    @ApiProperty()
    @Expose()
    @IsEmail()
    Email_address: string;

    @ApiProperty()
    @Expose()
    @IsBoolean()
    Is_Youtuber: boolean;

    @ApiProperty()
    @Expose()
    @IsBoolean()
    Is_Pro: boolean;


    @ApiProperty()
    @IsEnum(UserRole)
    Role: UserRole;


    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    updatedAt: Date;
}

