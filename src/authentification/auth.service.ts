import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }


  // async signInAuth(username: string, password: string): Promise<any> {
  //   const user = await this.userService.signIn(username, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   const { Password, ...payload } = user;
  //   return await this.jwtService.signAsync(payload);
  // }
}

