// TOOLS
import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SERVICES
import { SubscriptionService } from '../service/subscription.service';



@ApiTags('SUBSCRIPTION')
@Controller('subscription')
export class SubscriptionController {
    constructor(
        private readonly subcriptionService: SubscriptionService
    ) { }

    @Post('SubscribeToUser/:userId/:followedId')
    async subscribe(@Param('userId', ParseIntPipe) userId: number, @Param('followedId', ParseIntPipe) followedId: number) {
        return await this.subcriptionService.subscribe(userId, followedId)
    }

    @Get('getFollowedUserByUserName/:userName')
    async getFollowedUserByUserName(@Param('userName') userName: string) {
        return await this.subcriptionService.getFollowedUserByUserName(userName)
    }

}