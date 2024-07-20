import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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

}