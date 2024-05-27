import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
    private prisma = new PrismaClient();

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getUser(id: number): Promise<User> {
        return this.prisma.user.findUnique({ where: { id: Number(id) } });
    }

    async createUser(
        First_name: string,
        Last_Name: string,
        Password: string,
        Email_address: string,
        Is_Youtuber: boolean,
        Is_Pro: boolean
    ): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: {
                First_name: First_name,
                Last_Name: Last_Name,
                Password: Password,
                Email_address: Email_address,
                Is_Youtuber: Is_Youtuber,
                Is_Pro: Is_Pro
            },
        });
        return newUser;
    }

    async updateUser(
        id: number,
        First_name?: string,
        Last_Name?: string,
        Password?: string,
        Email_address?: string,
        Is_Youtuber?: boolean,
        Is_Pro?: boolean
    ): Promise<User> {
        const user = await this.getUser(id);
        console.log(First_name);


        const updateUser = await this.prisma.user.update({
            where: { id: Number(id) },
            data: {
                First_name: First_name,
                Last_Name: user.Last_Name,
                Password: user.Password,
                Email_address: user.Email_address,
                Is_Youtuber: user.Is_Youtuber,
                Is_Pro: user.Is_Pro,

            },
        });
        console.log(First_name);

        console.log(updateUser);

        return updateUser;
    }

    async deleteUser(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id: Number(id) },
        });
    }
}

