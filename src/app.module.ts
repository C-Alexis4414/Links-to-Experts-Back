import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentification/auth.module';

@Module({
  imports: [UserModule, CategoryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
