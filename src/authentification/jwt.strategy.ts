import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserPayloadType } from './type/auth.type';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() { // constructor(private configService: ConfigService)
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: AuthPayloadDto): Promise<UserPayloadType> {
        return { userName: payload.userName }
    }
}