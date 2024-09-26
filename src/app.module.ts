import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { LikedModule } from './liked/liked.module';
import { AuthModule } from './authentification/auth.module';
import { TagsModule } from './tags/tag.module';
import { SubscriptionModule } from './subscription/subcription.module';
// import { ConfigModule } from '@nestjs/config';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    LikedModule,
    TagsModule,
    SubscriptionModule,
    AuthModule,
    SecurityModule,
  ],
  providers: [],

})
export class AppModule { }
