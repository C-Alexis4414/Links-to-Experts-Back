// TOOLS
import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SERVICES
import { SubscriptionService } from '../service/subscription.service';
import { JwtAuthGuard } from '../../authentification/guards/accessToken.guard';

@ApiTags('SUBSCRIPTION')
@Controller('subscription')
export class SubscriptionController {
    constructor(
        private readonly subcriptionService: SubscriptionService
    ) { }

    @Post('SubscribeToUser/me/:followedId')
    @UseGuards(JwtAuthGuard)
    async subscribeFromSession(@Req() req: any, @Param('followedId', ParseIntPipe) followedId: number) {
        const subscribeUserId = req.user?.userId;
        return await this.subcriptionService.subscribe(subscribeUserId, followedId)
    }

    @Get('getFollowedUserByUserName/:userName')
    async getFollowedUserByUserName(@Param('userName') userName: string) {
        return await this.subcriptionService.getFollowedUserByUserName(userName)
    }

}