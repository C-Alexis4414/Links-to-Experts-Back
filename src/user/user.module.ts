// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { UserController } from './controller/user.controller';

// SERVICES
import { UserService } from './service/user.service';
import { YoutuberService } from './service/youtuber.service';
import { ProfessionalService } from './service/professional.service';
import { PrismaService } from '../../prisma/prisma.service'

@Module({
    providers: [UserService, PrismaService, ProfessionalService, YoutuberService],
    controllers: [UserController],
    exports: [UserService], // Vérifier l'utilité
})
export class UserModule { }
