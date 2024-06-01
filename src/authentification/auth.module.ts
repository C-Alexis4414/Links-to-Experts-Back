//TOOLS
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

//CONTROLLERS
import { AuthController } from './auth.controller';

//SERVICES
import { AuthService } from './auth.service';

//MODULES
import { UserModule } from 'src/user/user.module';

//TEST
// import { LocalStrategy } from './strategies/local.strategy';

import { jwtConstants } from './auth.constant';



@Module({
  imports: [UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
