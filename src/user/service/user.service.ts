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

    async signIn(userName: string, password: string): Promise<UserType> {
        const user = await this.prisma.user.findFirst({ where: { First_name: userName, Password: password } });
        return user
    }
    async findName(userName: string): Promise<UserType> {
        const user = await this.prisma.user.findFirst({ where: { First_name: userName } });
        return user
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

    async deleteUser(id: number): Promise<any> {
        const deleteUser = await this.prisma.user.delete({ where: { id: id } });
        return deleteUser;
    }

    async getName(name: string): Promise<UserType> {
        const getName = await this.prisma.user.findFirst({ where: { First_name: name } });
        return getName;
    }
}

