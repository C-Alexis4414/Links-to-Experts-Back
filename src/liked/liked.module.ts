// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';

import { PrismaService } from '../../prisma/prisma.service';

import { LikedController } from './controller/liked.controller';

// SERVICES
import { LikedService } from './service/liked.service';

// MODULES

@Module({
    providers: [PrismaService, LikedService],
    controllers: [LikedController],
    exports: [],
    imports: [],
})
export class LikedModule {}
