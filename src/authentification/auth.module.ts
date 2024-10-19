//TOOLS
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

//CONTROLLERS
import { AuthController } from './controller/auth.controller';

//SERVICES
import { AuthService } from './service/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/service/user.service';

//STRATEGIES
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { LocalStrategy } from './strategies/login.strategy';



@Module({

  controllers: [AuthController],
  
  providers: [
    AuthService,
     PrismaService , 
     UserService, 
     AccessTokenStrategy, 
     LocalStrategy, 
     RefreshTokenStrategy],
     
  imports: [
    PassportModule,
    JwtModule.register({ }),],
})
export class AuthModule { }
