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
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { LocalStrategy } from './strategies/login.strategy';

// GUARDS
import { JwtAuthGuard } from './guards/accessToken.guard';
import { RefreshAccessTokenGuard } from './guards/refreshAcces.guard';



@Module({

  controllers: [AuthController],
  providers: [
    AuthService,
     PrismaService , 
     UserService, 
     AccessTokenStrategy, 
     LocalStrategy,
     JwtAuthGuard,
     RefreshAccessTokenGuard
    ],
  imports: [
    PassportModule,
    JwtModule.register({ }),],
})
export class AuthModule { }
