import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class LikedService {
    private readonly prisma = new PrismaService();


    /**
     * ce service permet de connaitre tout les user qui ont like 1 categorie et inversement
     * il permet egalement de gerer les like et unlike d'un utilisateur
     * 
     * 
     * si un user ou une categorie venais a etre supprimer les données liés seront supprimer aussi, cela est deja gerer par le model de donnée
     * 
     * TODO: refactoriser en utilisant les outils nest et prisma
     *       faire les dto
     *       faire les type/interface
     *  
     *      
     */

    async findUsersWhoLikedCategoryById(categoryId: number) {
        return await this.prisma.liked.findMany({
            where: {
                categoryId,
            },
            select: {
                user: true,
            },
        });
    }

    async findCategoriesLikedByUserId(userId: number) {
        return await this.prisma.liked.findMany({
            where: {
                userId,
            },
            select: {
                category: true,
            },
        });
    }

    async findCategoriesLikedByUserName(userName: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { userName } });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return await this.prisma.liked.findMany({
            where: {
                userId: user.id,
            },
            select: {
                category: true,
            },
        });
    }

    async findUsersWhoLikedByCategoryName(categoryName: string): Promise<any> {
        const category = await this.prisma.category.findUnique({ where: { name: categoryName } });
        if (!category) {
            throw new BadRequestException('Category not found');
        }
        return await this.prisma.liked.findMany({
            where: {
                categoryId: category.id,
            },
            select: {
                user: {
                    select: {
                        userName: true
                    }

                }
            },
        });
    }

    async toggleCategoryLike(userId: number, categoryId: number) {
        const existingLike = await this.prisma.liked.findUnique({
            where: {
                likedId: {
                    userId,
                    categoryId,
                }
            },
            select: {
                user: {
                    select: {
                        userName: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (existingLike) {
            return await this.prisma.liked.delete({
                where: {
                    likedId: {
                        userId,
                        categoryId,
                    },
                },
            });
        } else {
            return await this.prisma.liked.create({
                data: {
                    userId,
                    categoryId,
                },
                select: {
                    user: {
                        select: {
                            userName: true
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            });
        }
    }
}