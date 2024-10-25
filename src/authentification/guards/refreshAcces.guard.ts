import {
    Injectable, CanActivate, ExecutionContext, ForbiddenException
  } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';

// ce fichier permet de faire une route public, il faut le lier a un decorateur
@Injectable()
export class RefreshAccessTokenGuard implements CanActivate { 
    constructor(private readonly jwtService: JwtService ,
        private readonly userService: UserService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const accessToken = request.cookies?.accessToken;
        if (!accessToken) {
          throw new ForbiddenException('Refresh token not found');
        }
        const decode = await this.jwtService.decode(accessToken);
        if (!decode) {
          throw new ForbiddenException('Invalid access token');
        }
        const user = await this.userService.getUser(decode.userId);
        if (!user) {
          throw new ForbiddenException('Access denied no user');
        }
        if (user.hashRefreshToken !== decode.rt) {
          throw new ForbiddenException('Access denied: invalid refresh token');
        }
        const currentTime = Date.now();
        const expireAt = user.refreshExpiresAt.getTime();
        if (currentTime > expireAt) {
          throw new ForbiddenException('Access denied: token expired');
        }
        return true;
      }


}
