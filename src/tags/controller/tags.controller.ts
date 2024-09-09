// TOOLS
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SERVICES
import { TagService } from '../../tags/service/tags.service';

// TYPE
import { TagType } from '../type/tag.type';

// DTO
import { TagDto } from '../dto/tag.dto';


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