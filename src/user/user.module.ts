import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { PrismaService } from 'src/prisma.service';
import { YoutuberService } from './service/youtuber.service';
import { ProfessionalService } from './service/professional.service';

@Module({
    providers: [UserService, PrismaService, ProfessionalService, YoutuberService],
    controllers: [UserController],
    exports: [],
})
export class UserModule { }
