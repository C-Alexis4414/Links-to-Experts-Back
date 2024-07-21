import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './authentification/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, CategoryModule, AuthModule],
  controllers: [],
  providers: [],

})
export class AppModule { }
