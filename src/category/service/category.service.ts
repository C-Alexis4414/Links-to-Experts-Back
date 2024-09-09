// NEST
import { BadRequestException, Injectable } from '@nestjs/common';

// SERVICE
import { PrismaService } from 'src/prisma.service';

// TYPE
import { CategoryType } from '../type/category.type';

// DTO
import { CategoryDto } from '../dto/category.dto';


@Injectable()
export class CategoryService {
    private readonly prisma = new PrismaService();

    /*
    TODO:
   
  
    updateCategory
  

    encours:   DeleteCategorybyName ( gerer les relations queries)
    
    relations: tags et likes
     get category by tags
     get category like by userid
     like
     unlike
    */
    async getCategoryById(id: number): Promise<CategoryType> {
        return await this.prisma.category.findUnique({ where: { id: id } });
    }

    async getCategoryByName(name: string): Promise<CategoryType> {
        return await this.prisma.category.findUnique({ where: { name } });
    }

    async getAllCategory(): Promise<CategoryType[]> {
        return await this.prisma.category.findMany();
    }

    async createCategory(CategoryName: CategoryDto): Promise<CategoryType> {
        const newCategory = await this.prisma.category.create({
            data: {
                ...CategoryName
            },
            include: {
                likes: true,
                tags: true
            }
        })
        return newCategory;
    }

    async deleteCategoryByName(categoryName: string): Promise<void> {

        const existingCategory = await this.prisma.category.findUnique({ where: { name: categoryName } })
        if (!existingCategory) {
            throw new BadRequestException(`Category ${categoryName} does not exist.`);
        }

        await this.prisma.category.delete({
            where: { id: existingCategory.id },
            include: {
                likes: true,
                tags: true
            }
        })
    }

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