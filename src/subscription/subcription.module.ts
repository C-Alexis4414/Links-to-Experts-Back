// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { SubscriptionController } from './controller/subscription.controller';

// SERVICES
import { SubscriptionService } from './service/subscription.service';
import { PrismaService } from 'src/prisma.service';

// MODULES
import { UserModule } from 'src/user/user.module';



@Module({
    providers: [SubscriptionService, PrismaService,],
    controllers: [SubscriptionController],
    exports: [],
    imports: []
})
export class SubscriptionModule { }