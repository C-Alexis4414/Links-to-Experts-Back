// TOOLS
import { Controller, Get, Put, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SERVICES
import { JwtAuthGuard } from 'src/authentification/guards/accessToken.guard';

import { LikedService } from '../service/liked.service';
import { CategoryService } from '../../category/service/category.service';

@ApiTags('LIKED')
@Controller('liked')
export class LikedController {
    constructor(private readonly likedService: LikedService) {}

    @Get('UserWhoLikeACategory/:categoryId')
    async findUsersWhoLikedCategory(
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ): Promise<any> {
        return await this.likedService.findUsersWhoLikedCategoryById(categoryId);
    }

    @Get('CategoriesLikedByUserId/:userId')
    async findCategoriesLikedByUser(@Param('userId', ParseIntPipe) userId: number): Promise<any> {
        return await this.likedService.findCategoriesLikedByUserId(userId);
    }

    @Get('CategoriesLikedByUserName/:userName')
    async findCategoriesLikedByUserName(@Param('userName') userName: string): Promise<any> {
        return await this.likedService.findCategoriesLikedByUserName(userName);
    }

    @Get('UsersWhoLikeByCategoryName/:categoryName')
    async findUsersWhoLikedByCategoryName(
        @Param('categoryName') categoryName: string,
    ): Promise<any> {
        return await this.likedService.findUsersWhoLikedByCategoryName(categoryName);
    }

    @Put('likeOrUnlike/me/:categoryId')
    @UseGuards(JwtAuthGuard)
    async toggleCategoryLike(
        @Req() req: any,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ): Promise<any> {
        const likeUserId = req.user?.userId;
        return await this.likedService.toggleCategoryLike(likeUserId, categoryId);
    }
}
