import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenPayload } from '../type/refreshTokenPayload.type';

// strategy to extract refresh token from cookies to check JWT encrypt and payload 
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'rtStrategy'
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractRefreshTokenFromCookie
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN'),
      passReqToCallback: true // permet de ne pas detruire le token de refresh
    });
  }

  private static extractRefreshTokenFromCookie(req: Request): string | null {
    const token = req.cookies?.refreshToken || null;
      return token;
  }

  validate(req: Request, payload: RefreshTokenPayload) {
    const refreshToken = req.cookies?.refreshToken;
    return { ...payload, refreshToken };
  }
}