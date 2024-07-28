//TOOLS
import { Module } from '@nestjs/common';

//CONTROLLERS
import { AuthController } from './controller/auth.controller';

//SERVICES
import { AuthService } from './service/auth.service';
import { PrismaService } from 'src/prisma.service';

//MODULES
import { UserModule } from 'src/user/user.module';

//JWT
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({

  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),],
})
export class AuthModule { }
