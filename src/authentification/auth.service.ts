import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { UserDto } from 'src/user/dto/getUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/user/type/user.type';
import { RegisterDto } from 'src/user/dto/register.dto';
import { LogInUserDto } from 'src/user/dto/logInUser.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async authenticateUser(logInData: LogInUserDto): Promise<any> {
    const user = await this.userService.logInUser(logInData);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password or email address');
    }
    const payload = { username: user.Username, password: user.Password, email: user.Email_address, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token
  }

}

