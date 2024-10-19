
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '../type/accessTokenPayload.type';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../service/auth.service';

// strategy to extract access token from cookies to check JWT encrypt and payload 
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,'accessToken') {
    constructor(
       configService: ConfigService, 
    ) {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([AccessTokenStrategy.extractJWTFromCookie]),
          ignoreExpiration: false,
          secretOrKey: configService.get<string>('JWT_SECRET')
        });
      }

    private static extractJWTFromCookie(req: Request): string | null {
      const token = req.cookies?.accessToken || null;
      return token;
        
    }

    async validate(payload: AccessTokenPayload): Promise<AccessTokenPayload> {
        return { userName: payload.userName, email: payload.email, userId: payload.userId}
    }
}