// TOOLS
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SERVICES
import { CategoryService } from '../service/category.service';

// TYPE
import { CategoryType } from '../type/category.type';

// DTO
import { CategoryDto } from '../dto/category.dto';
import { AccessTokenPayload } from 'src/authentification/type/accessTokenPayload.type';


@ApiTags('CATEGORY')
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    @Get('id/:id')
    async getCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryType> {
        return await this.categoryService.getCategoryById(id)
    }

    @Get('name/:name')
    async getCategoryByName(@Param('name') categoryName: string): Promise<CategoryType> {
        return await this.categoryService.getCategoryByName(categoryName)
    }

    @Get('allCategory')
    async getAllCategory(): Promise<CategoryType[]> {
        return await this.categoryService.getAllCategory();
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post('createCategorie')
    async createCategory(@Body() categoryName: CategoryDto): Promise<CategoryType> {
        return await this.categoryService.createCategory(categoryName)
    }

    @Delete('deleteCategorybyName/:categoryName')
    async deleteCategoryByName(@Param('categoryName') categoryName: string): Promise<void> {
        await this.categoryService.deleteCategoryByName(categoryName);
    }

    @Delete('deleteCategoryById/:id')
    async deleteCategoryById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.categoryService.deleteCategoryById(id)
    }

    @Get('search')
    async searchCategories(@Query('name') name: string, @Req() req: { user: AccessTokenPayload }) {
        const userId = req.user.userId;
        return this.categoryService.searchByName(name, userId);
    }

    // @UseGuards(JwtAuthGuard)
    // @Get("latest")
    // async getLatestCategories(@Req() req): Promise<CategoryType[]> {
    //     return await this.categoryService.getLatestCategoriesWithLikeStatus(req.user.id);
    // }
}