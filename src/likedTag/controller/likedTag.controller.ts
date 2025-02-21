import { Controller, Get, Put, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LikedTagService } from '../service/likedTag.service';

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

    @Put('likeOrUnlike/:userId/:tagId')
    async toggleTagLike(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('tagId', ParseIntPipe) tagId: number): Promise<any> {
        return await this.likedTagService.toggleTagLike(userId, tagId);
    }
}
