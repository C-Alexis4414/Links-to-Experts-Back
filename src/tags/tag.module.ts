import { Module } from '@nestjs/common';
import { TagController } from './controller/tags.controller';
import { TagService } from './service/tags.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [TagService, PrismaService],
    controllers: [TagController],
    exports: [TagsModule],
})
export class TagsModule { }