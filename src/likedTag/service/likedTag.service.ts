import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class LikedTagService {
    private readonly prisma = new PrismaService();

    async findUsersWhoLikedTagById(tagId: number) {
        return await this.prisma.likedTag.findMany({
            where: {
                tagId: tagId
            },
            select: {
                user: true
            }
        });
    }

    async findTagsLikedByUserId(userId: number) {
        return await this.prisma.likedTag.findMany({
            where: {
                userId: userId
            },
            select: {
                tag: true
            }
        });
    }

    async findUsersWhoLikedByTagName(tagName: string) {
        const tag = await this.prisma.tags.findUnique({ where: { name: tagName } });
        if (!tag) {
            throw new BadRequestException('Tag not found');
        }
        return await this.prisma.likedTag.findMany({
            where: {
                tagId: tag.id
            },
            select: {
                user: {
                    select: {
                        userName: true
                    }
                }
            }
        });
    }

    async toggleTagLike(userId: number, tagId: number) {
        try {
            const existingLike = await this.prisma.likedTag.findUnique({
                where: {
                    likedTagId: {
                        userId,
                        tagId,
                    }
                },
                select: {
                    user: {
                        select: {
                            userName: true
                        }
                    },
                    tag: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            if (existingLike) {
                return await this.prisma.likedTag.delete({
                    where: {
                        likedTagId: {
                            userId,
                            tagId,
                        },
                    }
                });
            } else {
                return await this.prisma.likedTag.create({
                    data: {
                        userId,
                        tagId,
                    },
                    select: {
                        user: {
                            select: {
                                userName: true
                            }
                        },
                        tag: {
                            select: {
                                name: true
                            }
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error in tag Like:', error);
            throw error;
        }
    }

    async findTagsLikedByUserName(userName: string) {
        const user = await this.prisma.user.findUnique({ where: { userName } });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return await this.prisma.likedTag.findMany({
            where: {
                userId: user.id
            },
            select: {
                tag: true
            }
        });
    }
}
