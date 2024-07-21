import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { TagService } from '../service/tags.service';
import { CategoryType } from '../type/category.type';
import { TagType } from '../type/tag.type';
import { CategoryDto } from '../dto/category.dto';
import { TagDto } from '../dto/tag.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly tagService: TagService
    ) { }

    @Get('id/:id')
    async getCategory(@Param('id') id: number): Promise<CategoryType> {
        return await this.categoryService.getCategoryById(Number(id))
    }

    @Get('name/:name')
    async getCategoryName(@Param('name') name: string): Promise<CategoryType> {
        return await this.categoryService.getCategoryByName(name)
    }

    @Get('allCategory')
    async getAllCategory(): Promise<CategoryType[]> {
        return await this.categoryService.getAllCategory();
    }

    @Post('createCategorie')
    async createCategory(@Body() categoryName: CategoryDto): Promise<CategoryType> {
        return await this.categoryService.createCategory(categoryName)
    }

    @Delete('deleteCategorybyName/:categoryName')
    async deleteCategoryByName(@Param() categoryName: CategoryDto): Promise<void> {
        return await this.categoryService.deleteCategoryByName(categoryName);
    }

    @Delete('deleteCategoryById/:id')
    async deleteCategoryById(@Param('id') id: number): Promise<void> {
        return await this.categoryService.deleteCategoryById(Number(id))
    }

    /** 
     * tag controller 
     * 
    */

    @Get('getTagById/:id')
    async getTagById(@Param('id') id: number): Promise<TagType> {
        return await this.tagService.getTagById(Number(id))
    }

    @Get('getTagByName/:tagName')
    async getTagByName(@Param('tagName') tagName: string): Promise<TagType> {
        return await this.tagService.getTagByName(tagName)
    }

    @Get('getAllTags')
    async getAllTags(): Promise<TagType[]> {
        return await this.tagService.getAllTags()
    }

    @Post('createTag')
    async createTag(@Body() tagName: TagDto): Promise<TagType> {
        return await this.tagService.createTag(tagName)
    }

    @Delete('deleteTagById/:id')
    async deleteTagById(@Param('id') id: number): Promise<void> {
        return await this.tagService.deleteTagById(Number(id))
    }



}