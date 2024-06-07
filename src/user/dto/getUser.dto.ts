import { Exclude, Expose } from 'class-transformer';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    First_name: string;

    @Expose()
    Last_Name: string;

    @Expose()
    Email_address: string;

    @Expose()
    Is_Youtuber: boolean;

    @Expose()
    Is_Pro: boolean;

    // Exclude password from being returned
    @Exclude({ toPlainOnly: true })
    Password: string;
}

