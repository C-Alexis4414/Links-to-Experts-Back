import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TagDto } from '../dto/tag.dto';

@Injectable()
export class TagService {
    private readonly prisma = new PrismaService();

    async getTagById(id: number): Promise<any> {
        return await this.prisma.tags.findUnique({ where: { id } })
    }

    async getAllTags(): Promise<any> {
        return await this.prisma.tags.findMany();
    }

    async getTagByName(tagName: string): Promise<any> {
        return await this.prisma.tags.findUnique({ where: { name: tagName } })
    }

    async createTag(tagData: TagDto): Promise<any> {
        const newTag = await this.prisma.tags.create({
            data: {
                ...tagData
            },
            include: {
                category: true
            }
        })
    }

    async deleteTagById(tagId: number): Promise<void> {
        await this.prisma.tags.delete({
            where: { id: tagId }
        })
    }
}