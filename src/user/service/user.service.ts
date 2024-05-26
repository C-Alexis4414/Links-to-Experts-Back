import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
    private prisma = new PrismaClient();

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async createUser(
        First_name: string,
        Last_Name: string,
        Password: string,
        Email_address: string,
        Is_Youtuber: boolean,
        Is_Pro: boolean
    ): Promise<User> {
        return this.prisma.user.create({
            data: {
                First_name,
                Last_Name,
                Password,
                Email_address,
                Is_Youtuber,
                Is_Pro
            },
        });
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
        return this.prisma.user.update({
            where: { id },
            data: {
                First_name,
                Last_Name,
                Password,
                Email_address,
                Is_Youtuber,
                Is_Pro
            },
        });
    }

    async deleteUser(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}

