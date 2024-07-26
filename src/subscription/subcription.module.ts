import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionService } from './service/subscription.service';
import { SubscriptionController } from './controller/subscription.controller';
import { UserModule } from 'src/user/user.module';


@Module({
    providers: [ PrismaService,SubscriptionService],
    controllers: [SubscriptionController],
    exports: [],
    imports:[UserModule]
})
export class SubscriptionModule { }