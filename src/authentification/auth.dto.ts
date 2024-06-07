import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class signInDto {
    @ApiProperty()
    @Expose()
    First_name: string;

    // Exclude password from being returned
    @ApiProperty()
    @Exclude({ toPlainOnly: true })
    Password: string;
}

