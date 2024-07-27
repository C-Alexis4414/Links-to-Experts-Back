import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { UserDataDto } from 'src/user/dto/userData.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
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
  async getUser() {
    return await this.userService.getAllUser()
  }

  // validate user password and email
  async login(authData: AuthDto): Promise<any> {
    const user = await this.userService.getByEmail(authData.email)

    if (!user) {
      throw new Error('something was wrong during login user dosen\'t exist')
    }  

    // on crypte l'input de l'utilisateur
    // const hashPassword = await this.hashPassword(authData.password)
    // on vérifie que le mdp est valide
    const isPasswordValid = await this.isPasswordValid(authData.password, user.password)
    console.log(authData.password, user.password);

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new Error('something where wrong during authentication')
    }

    return await this.authenticateUser(user)
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
  private async authenticateUser(userData: UserDataDto) {
    // payload = data how can identify user (@unique)
    const payload = { userData }
    console.log(payload);
    return { accessToken: await this.jwtService.signAsync(payload) }
  }



}

