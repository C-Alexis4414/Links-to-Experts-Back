import { Module } from '@nestjs/common';
import { LikedTagController } from './controller/likedTag.controller';
import { LikedTagService } from './service/likedTag.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { TagsModule } from 'src/tags/tag.module';

@Module({
    providers: [PrismaService, LikedTagService],
    controllers: [LikedTagController],
    exports: [],
    imports: []
})
export class LikedTagModule {
}
