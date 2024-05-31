//TOOLS
import { Module } from '@nestjs/common';

//CONTROLLERS
import { AuthController } from './auth.controller';

//SERVICES
import { AuthService } from './auth.service';

//MODULES
import { UserModule } from 'src/user/user.module';

//JWT
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';

@Module({
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
