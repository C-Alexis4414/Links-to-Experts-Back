import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from '../../category/service/category.service';
import { TagService } from '../../tags/service/tags.service';
import { CategoryType } from '../../category/type/category.type';
import { TagType } from '../type/tag.type';
import { CategoryDto } from '../../category/dto/category.dto';
import { TagDto } from '../dto/tag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TAGS')
@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) { }

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