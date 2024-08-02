// NEST
import { Injectable } from '@nestjs/common';

// JWT
import { JwtService } from '@nestjs/jwt';

// SERVICE
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/service/user.service';

// DTO
import { AuthLoginDto, AuthPayloadDto } from '../dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/userData.dto';

// TYPE
import { UserPayloadType } from '../type/auth.type';

// OTHER
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  /**
   * 
   * TODO:
   * se renseigner sur le cryptage du mdp ??
   * se mettre d'accord sur les format de retour des fonctions
   * 
   * JWT AUTH regarder a quoi sert vraiment ce fichier 
   * 
   */

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
      throw new Error('something was wrong during login')
    }

    const isPasswordValid = await this.isPasswordValid(authData.password, user.password)
    if (!isPasswordValid) {
      throw new Error('something where wrong during authentication')
    }

    const payload: UserPayloadType = { userName: user.userName }
    return await this.authenticateUser(payload)
  }

  async register(userData: CreateUserDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userData.email
      },
      select: {
        id: true,
        userName: true,
        password: true
      }
    })

    if (user) {
      throw new Error('User already exist')
    }

    const hashedPassword = await this.hashPassword(userData.password)
    userData.password = hashedPassword
    const newUser = await this.userService.createUser(userData)

    const payload: UserPayloadType = { userName: newUser.userName }
    return await this.authenticateUser(payload)
  }

  // private because we use this function only in auth service
  private async hashPassword(password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
  }

  //compare password User DB and input user password
  private async isPasswordValid(password: string, hashedPassword: string): Promise<any> {
    return await bcrypt.compare(password, hashedPassword)

  }

  // create jwt token
  private async authenticateUser(userPayload: AuthPayloadDto) {
    // payload = data how can identify user (@unique)
    return await this.jwtService.signAsync(userPayload)
  }
}

