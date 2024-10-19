import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';
import { AccessTokenPayload } from '../type/accessTokenPayload.type';

// startegy to extract user input from request and check if there valid
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
      // can automatically recognise password fields 
    });
  }

  async validate(email: string, password: string):Promise<AccessTokenPayload> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
