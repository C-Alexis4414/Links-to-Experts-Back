//TOOLS
import { validate } from 'class-validator';

// MODULE
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';

import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { LikedModule } from './liked/liked.module';
import { AuthModule } from './authentification/auth.module';
import { TagsModule } from './tags/tag.module';
import { SubscriptionModule } from './subscription/subcription.module';
import { LikedTagModule } from './likedTag/likedTag.module';

// GUARDS

import { JwtAuthGuard } from './authentification/guards/accessToken.guard';

// SERVICE

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validate,
        }),
        UserModule,
        CategoryModule,
        LikedModule,
        TagsModule,
        SubscriptionModule,
        AuthModule,
        LikedTagModule,
    ],
    controllers: [],
    providers: [
        PrismaService,
        // use jwtAuthguard to protect all app
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        JwtService,
    ],
})
export class AppModule {}
