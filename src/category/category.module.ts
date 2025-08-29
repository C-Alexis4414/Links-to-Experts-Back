// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { PrismaService } from '../../prisma/prisma.service';

import { CategoryController } from './controller/category.controller';

// SERVICES
import { CategoryService } from './service/category.service';

@Module({
    providers: [CategoryService, PrismaService],
    controllers: [CategoryController],
    exports: [],
    imports: [],
})
export class CategoryModule {}
