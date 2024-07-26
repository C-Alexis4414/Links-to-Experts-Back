import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { TagService } from './service/tags.service';
import { CategoryController } from './controller/category.controller';
import { TagController } from './controller/tags.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [CategoryService, TagService, PrismaService],
    controllers: [CategoryController, TagController],
    exports: [CategoryModule]
})
export class CategoryModule { }
