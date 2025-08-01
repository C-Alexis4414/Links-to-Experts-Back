// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { SubscriptionController } from './controller/subscription.controller';

// SERVICES
import { SubscriptionService } from './service/subscription.service';
import { PrismaService } from '../../prisma/prisma.service';


@Module({
    providers: [SubscriptionService, PrismaService,],
    controllers: [SubscriptionController],
    exports: [],
    imports: []
})
export class SubscriptionModule { }