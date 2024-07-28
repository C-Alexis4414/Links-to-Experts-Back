// TOOLS
import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SERVICES
import { PrismaService } from 'src/prisma.service';
import { SubscriptionService } from '../service/subscription.service';



@ApiTags('SUBCRIPTION')
@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly prisma: PrismaService,
        private readonly subcriptionService: SubscriptionService
    ) { }

    @Get('getall')
    async test() {
        return await this.subcriptionService.getAll()
    }

    async getSubscriptionByUsername(username: string) { }

    @Post('SubscribeToUser/:userId/:followedId')
    async subscribe(@Param('userId', ParseIntPipe) userId: number, @Param('followedId', ParseIntPipe) followedId: number) {
        return await this.subcriptionService.subscribe(userId, followedId)
    }

    @Get('getFollowedUserByUserName/:userName')
    async getFollowedUserByUserName(@Param('userName') userName: string) {
        return await this.subcriptionService.getFollowedUserByUserName(userName)
    }

}