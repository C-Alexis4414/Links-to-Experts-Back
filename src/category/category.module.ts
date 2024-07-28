// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { CategoryController } from './controller/category.controller';

// SERVICES
import { CategoryService } from './service/category.service';
import { PrismaService } from 'src/prisma.service';

// MODULES
import { TagsModule } from 'src/tags/tag.module';


@Module({
    providers: [CategoryService, PrismaService],
    controllers: [CategoryController],
    exports: [],
    imports: []
})
export class CategoryModule { }
