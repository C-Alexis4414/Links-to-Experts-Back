import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthLoginDto, AuthPayloadDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserPayloadType } from '../type/auth.type';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  /**
   * 
   * TODO:
   * se renseigner sur le cryptage du mdp ??
   * se mettre d'accord sur les format de retour des fonctions
   * 
   * fct login: revoir authenticate pour plus de securite avec le payload
   * 
   */

  // validate user password and email
  async login(authData: AuthLoginDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authData.email
      },
      select: {
        id: true,
        userName: true,
        password: true
      }
    })

    if (!user) {
      throw new Error('something was wrong during login user dosen\'t exist')
    }

    // on crypte l'input de l'utilisateur
    // const hashPassword = await this.hashPassword(authData.password)
    // on vérifie que le mdp est valide
    const isPasswordValid = await this.isPasswordValid(authData.password, user.password)

    if (!isPasswordValid) {
      throw new Error('something where wrong during authentication')
    }
    
    const payload: UserPayloadType = { id: user.id, userName: user.userName }
    return await this.authenticateUser(payload)
  }

  // private because we use this function only in auth service
  // hash password user
  // private async hashPassword(password: string): Promise<any> {
  //   const hashedPassword = await bcrypt.hash(password, 10)
  //   return hashedPassword;
  // }

  //compare password User DB and input user password
  private async isPasswordValid(password: string, hashedPassword: string): Promise<any> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword)
    return isPasswordValid;
  }

  // create jwt token
  private async authenticateUser(userPayload: AuthPayloadDto) {
    // payload = data how can identify user (@unique)
    return { accessToken: await this.jwtService.signAsync(userPayload) }
  }
}

