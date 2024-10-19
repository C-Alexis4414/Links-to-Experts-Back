// NEST
import { BadRequestException, Injectable } from '@nestjs/common';

// JWT
import { JwtService } from '@nestjs/jwt';

// SERVICE
import { PrismaService, } from 'src/prisma.service';
import { UserService } from 'src/user/service/user.service';
import { ConfigService } from '@nestjs/config';

// DTO
import { CreateUserDto } from 'src/user/dto/userData.dto';

// TYPE
import { AccessTokenPayload } from '../type/accessTokenPayload.type';
import { JwtToken } from '../type/jwtToken.type';

// TOOLS
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }
 
  // register a new user and save Jwt Token
  async register (userData: CreateUserDto):Promise<JwtToken>{
    const existingUser = await this.prisma.user.findUnique({
          where: {
            email: userData.email
          }
    })
    if (existingUser) {
      // change the exeption error    
      throw new BadRequestException('user Already exist');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const newUser = await this.userService.createUser({...userData, password: hashedPassword})
    const payload: AccessTokenPayload = { userName: newUser.userName, email: newUser.email, userId: newUser.id }
    const getToken= await this.getToken(payload)
    const token : JwtToken = {accessToken:getToken.accessToken, refreshToken:getToken.refreshToken}
    return token
  }

  // valide user input
   async validateUser( email: string, password: string): Promise<AccessTokenPayload>{
    const user = await this.prisma.user.findUnique({where: {email: email}})
    if (!user) {
      // change the exeption error
      throw new BadRequestException('User not found');
    }
    const isMatch : boolean = await this.isPasswordValid(password, user.password)
    if (!isMatch) {
      // change the exeption error
      throw new BadRequestException('Password does not match');
    }
    const payload: AccessTokenPayload = {email: user.email, userId: user.id, userName: user.userName}
    return payload
   }

  // create and save JWT tokens
  async getToken(user:AccessTokenPayload):Promise<JwtToken>{
  const [accessToken, refreshToken] = await Promise.all([
  await  this.jwtService.signAsync({
    userName: user.userName,
    userId: user.userId}, 
      {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '2m'
    }
  ),
   await this.jwtService.signAsync({
      userName: user.userName,
      userId: user.userId
    }, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn: '2m'
    })
  ]);
  const savedToken = await this.saveToken(user.userId, accessToken, refreshToken,);
  return { accessToken: savedToken.accessToken , refreshToken : savedToken.refreshToken };
}

// update JWT tokens 
async saveToken(userId:number, accessToken:string, refreshToken:string):Promise<JwtToken>{
  // const hashRefreshToken = await bcrypt.hash(refreshToken,10) => to hashed the refresh tokens to more security
  const decodedRefreshToken = await this.jwtService.decode(refreshToken) as { exp?: number } | null ;
    const refreshExpiresAt = decodedRefreshToken?.exp
      ? new Date(decodedRefreshToken.exp * 1000) // => Convertir en millisecondes
      : null;
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
       accessToken,
       hashRefreshToken: refreshToken ,
        refreshExpiresAt
      }
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  // decode payload and delete JWT 
  async logout( accessToken: string):Promise<void> {
    const decodedAccessToken = await this.jwtService.decode(accessToken) as { userId?: number  }|  null;
    if (!decodedAccessToken || !decodedAccessToken.userId) {
      throw new BadRequestException('Invalid token'); // Gérer les cas où le token n'est pas valide
  }
    const user = await this.prisma.user.update({
      where: {
          id: decodedAccessToken.userId,
          accessToken: {
              not: null,
          },
          hashRefreshToken: {
              not: null,
          },
      },
      data: {
          accessToken: null,
          hashRefreshToken: null,
          refreshExpiresAt: null,
      },
  });
  }

  async refreshToken(refreshToken:string):Promise<JwtToken>{
    const decodedRefreshToken = await this.jwtService.decode(refreshToken) as { userId?: number  }|  null;
    if (!decodedRefreshToken || !decodedRefreshToken.userId) {
      throw new BadRequestException('Invalid token'); // Gérer les cas où le token n'est pas valide
    }
    const user = await this.prisma.user.findUnique({where:{id: decodedRefreshToken.userId}})
    if (!user) {
      throw new BadRequestException('User not found'); // Gérer les cas où l'utilisateur n'existe pas
    }
    const payload : AccessTokenPayload ={
      email: user.email, userId: user.id, userName: user.userName
    }
    const token = await this.getToken(payload)
    return token
  }


 //compare password User DB and input user password
 private async isPasswordValid(password: string, hashedPassword: string): Promise<any> {
  return await bcrypt.compare(password, hashedPassword)
}

}

// compare accessToken request to accessToken stock in database
//  async validateAccessToken(token: string, userId: number): Promise<boolean>{
//    const user = await this.prisma.user.findUnique({where: {id: userId}})
//    if(!user){
//     return false
//    }
//    if(token !== user.accessToken){
//     return false
//    }
//     return true;
//    }