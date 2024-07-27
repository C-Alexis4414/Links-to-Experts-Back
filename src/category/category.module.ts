import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import { PrismaService } from 'src/prisma.service';
import { TagsModule } from 'src/tags/tag.module';

@Module({
    providers: [CategoryService, PrismaService],
    controllers: [CategoryController],
    exports: [],
    imports: []
})
export class CategoryModule { }
