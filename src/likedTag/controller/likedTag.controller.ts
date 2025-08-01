import { Controller, Get, Put, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LikedTagService } from '../service/likedTag.service';
import { JwtAuthGuard } from 'src/authentification/guards/accessToken.guard';

@ApiTags('LIKED_TAG')
@Controller('likedTag')
export class LikedTagController {
    constructor(
        private readonly likedTagService: LikedTagService,
    ) { }

    @Get('UserWhoLikeATag/:tagId')
    async findUsersWhoLikedTag(@Param('tagId', ParseIntPipe) tagId: number): Promise<any> {
        return await this.likedTagService.findUsersWhoLikedTagById(tagId);
    }

    @Get('TagsLikedByUserId/:userId')
    async findTagsLikedByUser(@Param('userId', ParseIntPipe) userId: number): Promise<any> {
        return await this.likedTagService.findTagsLikedByUserId(userId);
    }

    @Get('TagsLikedByUserName/:userName')
    async findTagsLikedByUserName(@Param('userName') userName: string): Promise<any> {
        return await this.likedTagService.findTagsLikedByUserName(userName);
    }

    @Get('UsersWhoLikeByTagName/:tagName')
    async findUsersWhoLikedByTagName(@Param('tagName') tagName: string): Promise<any> {
        return await this.likedTagService.findUsersWhoLikedByTagName(tagName);
    }

    @Put('likeOrUnlike/me/:tagId')
    @UseGuards(JwtAuthGuard)
    async toggleTagLike(
        @Req() req: any,
        @Param('tagId', ParseIntPipe) tagId: number): Promise<any> {
        const tagLikeUserId = req.user?.userId;
        return await this.likedTagService.toggleTagLike(tagLikeUserId, tagId);
    }
}
