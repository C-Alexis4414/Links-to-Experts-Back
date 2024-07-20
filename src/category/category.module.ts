import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: []
})
export class CategoryModule { }
