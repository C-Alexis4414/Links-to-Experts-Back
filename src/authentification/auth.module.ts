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


@Module({

  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),],
})
export class AuthModule { }
