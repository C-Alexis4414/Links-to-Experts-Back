import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LikedService } from './service/liked.service';
import { LikedController } from './controller/liked.controler';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';


@Module({
    providers: [PrismaService, LikedService],
    controllers: [LikedController],
    exports: [LikedService],
    imports: [UserModule, CategoryModule]
})
export class LikedModule { }
