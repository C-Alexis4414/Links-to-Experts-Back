import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryType } from '../type/category.type';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
    private readonly prisma = new PrismaService();

    /*
    TODO:
   
  
    updateCategory
  

    encours:   createCategory (gerer les relations query) +   DeleteCategory ( gerer les relations queries)
    
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

    async deleteCategoryByName(categoryName: CategoryDto): Promise<void> {
        const existingCategory = await this.prisma.category.findUnique({ where: { name: categoryName.name } })
        if (!existingCategory) {
            throw new BadRequestException(`Category ${categoryName.name} does not exist.`);
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