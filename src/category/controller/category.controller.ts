import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CategoryType } from '../type/category.type';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('id/:id')
    async getCategory(@Param('id') id: number): Promise<CategoryType> {
        return await this.categoryService.getCategoryById(Number(id))
    }

    @Get('allCategory')
    async getAllCategory(): Promise<CategoryType[]> {
        return await this.categoryService.getAllCategory();
    }

}