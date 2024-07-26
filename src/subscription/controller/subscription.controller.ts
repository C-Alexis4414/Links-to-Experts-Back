import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';


@ApiTags('SUBCRIPTION')
@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly prismaService: PrismaService) { }



    async getSubscriptionByUsername(username: string) { }

    async subscribe() { }
    async unsubscribe() { }
    async validateSubscription() { }

}