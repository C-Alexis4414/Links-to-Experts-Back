//TOOLS
import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';

//CONTROLLERS
import { AuthController } from './controller/auth.controller';

//SERVICES
import { AuthService } from './service/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/service/user.service';

//JWT
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({

  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, UserService],
  imports: [
    // ConfigModule,
    JwtModule.register({ // JwtModule.registerAsync
      // useFactory: async (configService: ConfigService) => ({
      global: true,
      secret: process.env.JWT_SECRET, // secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '24h' },
      // inject: [ConfigService],
    }),],
})
export class AuthModule { }
