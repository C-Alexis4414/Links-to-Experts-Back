import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { LikedModule } from './liked/liked.module';
import { AuthModule } from './authentification/auth.module';
import { TagsModule } from './tags/tag.module';
import { SubscriptionModule } from './subscription/subcription.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'class-validator';
import { PrismaService } from './prisma.service';
import { AccessTokenStrategy } from './authentification/strategies/accessToken.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentification/guards/accessToken.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate
    }),
    UserModule,
    CategoryModule,
    LikedModule,
    TagsModule,
    SubscriptionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AccessTokenStrategy
  ],

})
export class AppModule { }
