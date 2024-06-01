import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { UserDto } from 'src/user/dto/getUser.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.signInUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.Email_address, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    console.log(access_token);

    return access_token
  }
}

