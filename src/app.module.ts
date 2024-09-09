import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { LikedModule } from './liked/liked.module';
import { AuthModule } from './authentification/auth.module';
import { TagsModule } from './tags/tag.module';
import { SubscriptionModule } from './subscription/subcription.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    LikedModule,
    TagsModule,
    SubscriptionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],

})
export class AppModule { }
