// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { TagController } from './controller/tags.controller';

// SERVICES
import { TagService } from './service/tags.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    providers: [TagService, PrismaService],
    controllers: [TagController],
    exports: [],
})
export class TagsModule { }