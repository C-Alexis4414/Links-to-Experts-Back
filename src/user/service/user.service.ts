import { Injectable } from '@nestjs/common';
import { UserType } from '../type/user.type';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUer.dto';

@Injectable()
export class UserService {
    private readonly prisma = new PrismaService();

    async getUsers(): Promise<UserType[]> {
        return await this.prisma.user.findMany();
    }

    async getUser(id: number): Promise<UserType> {
        return await this.prisma.user.findUnique({ where: { id: Number(id) } });
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserType> {
        const newUser = await this.prisma.user.create({
            data: {
                ...createUserDto,
            },
        });
        return newUser;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserType> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...updateUserDto,
            },
        });
        return updatedUser;

    }

    async deleteUser(id: number): Promise<void> {
        const deleteUser = await this.prisma.user.delete({ where: { id: id } });
    }
}

