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
  async register (userData: CreateUserDto){
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
    const token : JwtToken = {accessToken:getToken.accessToken}
    return { token,  payload}
  }


  // create, hash and save JWT tokens
  async getToken(user:AccessTokenPayload){
    const existingUser= await this.prisma.user.findUnique({where:{email:user.email}})
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }
    const refreshToken =  await this.jwtService.signAsync({
      userName: user.userName,
      userId: user.userId
    }, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn: '7d'
    })
    const decodedToken = this.jwtService.decode(refreshToken) as { exp: number };
    const timeExp = decodedToken?.exp ? new Date(decodedToken.exp * 1000) : null;
  const hashToken = await bcrypt.hashSync(refreshToken,10)
  const accessToken= await  this.jwtService.signAsync({
    userName: user.userName,
    userId: user.userId,
    rt : hashToken
  }, 
      {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '5m'
    }
  )
  const savedToken = await this.saveToken(user.userId, accessToken, hashToken, timeExp);
  const payload = {userId:existingUser.id, userName: existingUser.userName, email: existingUser.email}
  return { accessToken: savedToken.accessToken,payload};
}

// update JWT tokens 
async saveToken(userId:number, accessToken:string, refreshToken:string, timeExp : Date):Promise<JwtToken>{
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
      accessToken,
      hashRefreshToken: refreshToken ,
      refreshExpiresAt : timeExp
      }
    });
    return { accessToken: accessToken,};
  }

  
  async refreshToken(accessToken:string):Promise<JwtToken>{
    const decodedAccesToken = await this.jwtService.decode(accessToken) as { userId?: number  }|  null;
    if (!decodedAccesToken || !decodedAccesToken.userId) {
      throw new BadRequestException('Invalid token'); // Gérer les cas où le token n'est pas valide
    }
    const user = await this.prisma.user.findUnique({where:{id: decodedAccesToken.userId}})
    if (!user) {
      throw new BadRequestException('User not found'); // Gérer les cas où l'utilisateur n'existe pas
    }
    const payload : AccessTokenPayload ={
      email: user.email, userId: user.id, userName: user.userName
    }
    const token = await this.getToken(payload)
    return token
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

 //compare password User DB and input user password
 private async isPasswordValid(password: string, hashedPassword: string): Promise<any> {
  return await bcrypt.compare(password, hashedPassword)
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

 async decodeToken(accessToken: string) {
  const decode = (await this.jwtService.decode(accessToken)) as { userId: number };
  const user = await this.prisma.user.findUnique({ where: { id: decode.userId } });
  return { id: user.id, email: user.email, userName: user.userName };
}
}