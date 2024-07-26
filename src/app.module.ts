import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { LikedModule } from './liked/liked.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentification/auth.module';

@Module({
  imports: [UserModule, CategoryModule, LikedModule],
  controllers: [],
  providers: [],

})
export class AppModule { }
