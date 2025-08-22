// TOOLS
import { Module } from '@nestjs/common';

// CONTROLLERS
import { PrismaService } from '../../prisma/prisma.service';

import { SubscriptionController } from './controller/subscription.controller';

// SERVICES
import { SubscriptionService } from './service/subscription.service';

@Module({
    providers: [SubscriptionService, PrismaService],
    controllers: [SubscriptionController],
    exports: [],
    imports: [],
})
export class SubscriptionModule {}
