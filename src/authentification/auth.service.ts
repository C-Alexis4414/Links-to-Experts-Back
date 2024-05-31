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

  async signInAuth(username: string, password: string): Promise<UserDto> {
    const user = await this.userService.signIn(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.Email_address, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    console.log(access_token);

    return user;
  }
}// import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
// import { UserService } from 'src/user/service/user.service';
// import { PrismaClient} from '@prisma/client';


// @Injectable()
// @Dependencies(UserService)
// export class AuthService {
//     constructor(
//         private readonly userService: UserService,
//         private readonly prisma: PrismaClient
//     ) {
        
//      }

    //  async signIn(username: string, pass: string) {
    //     const user = await this.prisma.user.findUnique({ where: {  username } });
    //     if (user?.password !== pass) {
    //       throw new UnauthorizedException();
    //     }
    //     const { password, ...result } = user;
    //     // TODO: Generate a JWT and return it here
    //     // instead of the user object
    //     return result;
    //   }

// }
