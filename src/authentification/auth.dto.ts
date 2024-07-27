import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class AuthDto {
    @ApiProperty()
    @Expose()
    email: string;

    // Exclude password from being returned
    @ApiProperty()
    @Exclude({ toPlainOnly: true })
    password: string;
}

