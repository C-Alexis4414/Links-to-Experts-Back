import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LikedService } from '../service/liked.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('LIKED')
@Controller('liked')
export class LikedController {
    constructor(
        private readonly likedService: LikedService,
    ) { }

    @Get('UserWhoLikeACategory/:categoryId')
    async findUsersWhoLikedCategory(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<any> {
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
    async findUsersWhoLikedByCategoryName(@Param('categoryName') categoryName: string): Promise<any> {
        return await this.likedService.findUsersWhoLikedByCategoryName(categoryName);
    }

    @Put('likeOrUnlike/:userId/:categoryId')
    async toggleCategoryLike(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('categoryId', ParseIntPipe) categoryId: number): Promise<any> {
        return await this.likedService.toggleCategoryLike(userId, categoryId);
    }
}