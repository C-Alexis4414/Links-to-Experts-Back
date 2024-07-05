import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PayloadType } from '../type/payloadStrategy.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
        });
    }

    async validate(payload: PayloadType) {
        const user = await this.prisma.user.findFirst({ where: { id: payload.userId, Email_address: payload.email, Username: payload.userName } });
        // username: user.Username, password: user.Password, email: user.Email_address, sub: user.id
        if (user) {
            const { Password, Salt, Role, ...result } = user;
            return result
        } else {
            throw new UnauthorizedException('Invalid validate action');
        }

    }
}
