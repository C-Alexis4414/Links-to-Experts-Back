// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { LikedController } from './controller/liked.controller';

// SERVICES
import { LikedService } from './service/liked.service';
import { PrismaService } from 'src/prisma.service';

// MODULES
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';



@Module({
    providers: [PrismaService, LikedService],
    controllers: [LikedController],
    exports: [],
    imports: []
})
export class LikedModule { }
