import { Injectable } from '@nestjs/common';
import { UserType } from '../type/user.type';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { UserDataDto } from '../dto/UserData.dto';

@Injectable()
export class UserService {
    private readonly prisma = new PrismaService();
    // async signIn(userName: string, password: string): Promise<UserType> {
    //     const user = await this.prisma.user.findFirst({ where: { First_name: userName, Password: password } });
    //     return user
    // }
    // async findName(userName: string): Promise<UserType> {
    //     const user = await this.prisma.user.findFirst({ where: { First_name: userName } });
    //     return user
    // }


    async getUser(id: number): Promise<UserType> {
        return await this.prisma.user.findUnique({ where: { id: id } });
    }

    async getByUserName(name: string): Promise<UserType> {
        const getName = await this.prisma.user.findUnique({ where: { userName: name } });
        return getName;
    }

    async getAllUser(): Promise<UserType[]> {
        const toto = await this.prisma.user.findMany();
        return toto;
    }

    async createUser(userData: CreateUserDto): Promise<UserType> {
        const newUser = await this.prisma.user.create({
            data: {
                ...userData,
                // if isYoutube ou isPro est vrai alors => create la dépandance
            },
        });
        return newUser;
    }

    async updateUser(id: number, userData: UserDataDto): Promise<UserType> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...userData,
                // if isYoutube ou isPro est vrai alors => create la dépandance
            },
        });
        return updatedUser;

    }

    async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id: id } });
    }


}

