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

    // @ApiProperty()
    // @IsString()
    // @IsOptional()
    // tagChannel?: string;

    // @ApiProperty()
    // @IsString()
    // @IsOptional()
    // urlLikendin?: string;
}

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

// export class UserIsYoutuber {
//     @ApiProperty()
//     @IsString()
//     @IsOptional()
//     tagChannel?: string;
// }

// export class UserIsProfessional {
//     @ApiProperty()
//     @IsString()
//     @IsOptional()
//     urlLikendin: string;
// }
}

