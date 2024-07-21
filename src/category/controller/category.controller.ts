import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
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

    /** 
     * tag controller 
     * 
    */

    @Get('getTagById/:id')
    async getTagById(@Param('id', ParseIntPipe) id: number): Promise<TagType> {
        return await this.tagService.getTagById(id)
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

    @Delete('deleteTagByName/:tagName')
    async deleteTagByName(@Param('tagName') tagName: string): Promise<void> {
        return await this.tagService.deleteTagByName(tagName)
    }

    @Delete('deleteTagById/:id')
    async deleteTagById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.tagService.deleteTagById(id)
    }

}