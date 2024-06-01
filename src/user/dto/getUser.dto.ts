import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UserDto {
    @Expose()
    @IsNumber()
    id: number;

    @Expose()
    @IsString()
    First_name: string;

    @Expose()
    @IsString()
    Last_Name: string;

    @Expose()
    @IsString()
    Username: string;

    @Expose()
    @IsString()
    Email_address: string;

    @Expose()   
    @IsBoolean()
    Is_Youtuber: boolean;

    @Expose()
    @IsBoolean()
    Is_Pro: boolean;

    // Exclude password from being returned
    @Exclude({ toPlainOnly: true })
    @IsString()
    Password: string;
}

