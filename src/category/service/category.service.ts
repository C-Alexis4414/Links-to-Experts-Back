import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryType } from '../type/category.type';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
    private readonly prisma = new PrismaService();

    /*
    TODO:
    getCategory
    get all
    get name
   
    createCategory
    updateCategory
    DeleteCategory
    
    relations: tags et likes
     get category by tags
     get category like by userid
     like
     unlike
    */
    async getCategoryById(id: number): Promise<any> {
        return await this.prisma.category.findUnique({ where: { id: id } });
    }

    async getAllCategory(): Promise<any> {
        return await this.prisma.category.findMany();
    }

    async createCategory(CategoryData: CategoryDto): Promise<CategoryType> {
        const newCategory = await this.prisma.category.create({
            data: {
                ...CategoryData
            },
            include: {
                likes: true,
                tags: true
            }
        })
        return newCategory;
    }

    // async deleteCategoryByName(categoryName: CategoryDto): Promise<void> {
    //     await this.prisma.category.delete({
    //         where: { name },
    //         include: {
    //             likes: true,
    //             tags: true
    //         }
    //     })
    // }


    async deleteCategoryById(id: number): Promise<void> {
        await this.prisma.category.delete({
            where: { id },
            include: {
                likes: true,
                tags: true
            }
        })
    }
}