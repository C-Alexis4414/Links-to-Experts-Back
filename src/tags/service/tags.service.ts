// NEST
import { BadRequestException, Injectable } from '@nestjs/common';

// TYPE
import { TagType } from '../type/tag.type';

// SERVICE
import { PrismaService } from '../../../prisma/prisma.service';

// DTO
import { TagDto } from '../../tags/dto/tag.dto';

@Injectable()
export class TagService {
    private readonly prisma = new PrismaService();

    async getTagById(id: number): Promise<TagType> {
        return await this.prisma.tags.findUnique({ where: { id } });
    }

    async getAllTags(): Promise<TagType[]> {
        return await this.prisma.tags.findMany();
    }

    async getTagByName(tagName: string): Promise<TagType> {
        return await this.prisma.tags.findUnique({ where: { name: tagName } });
    }

    async createTag(tagData: TagDto): Promise<TagType> {
        const existingCategory = await this.prisma.category.findUnique({
            where: { id: tagData.categoryId },
        });
        if (!existingCategory) {
            throw new BadRequestException('The provided category id does not exist');
        }

        const newTag = await this.prisma.tags.create({
            data: {
                name: tagData.name,
                categoryId: tagData.categoryId,
            },
        });
        return newTag;
    }

    async deleteTagById(tagId: number): Promise<void> {
        await this.prisma.tags.delete({
            where: { id: tagId },
            include: {
                category: true,
            },
        });
    }

    async deleteTagByName(tagName: string): Promise<void> {
        const existingCategory = await this.prisma.tags.findUnique({ where: { name: tagName } });
        if (!existingCategory) {
            throw new BadRequestException(`Category ${tagName} does not exist.`);
        }

        await this.prisma.tags.delete({
            where: { name: tagName },
            include: {
                category: true,
            },
        });
    }

    async searchByName(name: string, userId?: number) {
        const tags = await this.prisma.tags.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            include: {
                likedTag: userId
                    ? {
                          where: { userId: userId },
                          select: { userId: true },
                      }
                    : false,
            },
            take: 10,
        });

        return tags.map((tag) => ({
            ...tag,
            isLikedByCurrentUser: tag.likedTag.length > 0,
        }));
    }

    // async getLatestTagsWithLikeStatus(userId: number): Promise<TagType[]> {
    //     const tags = await this.prisma.tags.findMany({
    //         orderBy: { createdAt: 'desc' },
    //         take: 5,
    //         include: {
    //             likedTag: {
    //                 where: { userId },
    //                 select: { userId: true },
    //             },
    //         },
    //     });

    //     return tags.map(tag => ({
    //         id: tag.id,
    //         name: tag.name,
    //         categoryId: tag.categoryId,
    //         isLikedByCurrentUser: tag.likes.length > 0,
    //     }));
    // }
}
