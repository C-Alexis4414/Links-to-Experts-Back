import { BadRequestException, Injectable } from '@nestjs/common';
import { UserType } from '../type/user.type';
import { PrismaService } from 'src/prisma.service';
import { UserDataDto, CreateUserDto } from '../dto/userData.dto';

@Injectable()
export class UserService {
    private readonly prisma = new PrismaService();
    // find a user by id
    async getUser(id: number): Promise<UserType> {
        return await this.prisma.user.findUnique({ where: { id: id } });
    }

    // find a user by name
    async getByUserName(name: string): Promise<UserType> {
        const getName = await this.prisma.user.findUnique({ where: { userName: name } });
        return getName;
    }

    // find all users
    async getAllUser(): Promise<UserType[]> {
        return await this.prisma.user.findMany();

    }

    // create a user with relations queries
    async createUser(userData: CreateUserDto): Promise<UserType> {

        if (!userData.is_Youtuber && !userData.is_Professional) {
            throw new BadRequestException('User must be either a Youtuber or a Professional');
        }

        const youtuberData = userData.is_Youtuber
            ? { create: { tagChannel: userData.tagChannel } }
            : undefined;

        //TODO comment gérer les recommandations linkedins pendant la créations?
        const professionalData = userData.is_Professional
            ? { create: { urlLinkedin: userData.urlLikendin, recommandationLinkedin: {} } }
            : undefined;

        const newUser = await this.prisma.user.create({
            data: {
                userName: userData.userName,
                password: userData.password,
                email: userData.email,
                is_Youtuber: userData.is_Youtuber,
                is_Professional: userData.is_Professional,
                youtuber: youtuberData,
                professional: professionalData,
            },
            include: {
                youtuber: true,
                professional: true,
            },
        });
        return newUser;
    }
    // TODO: gérer les donées user, youtuber et professional
    async updateUser(id: number, userData: UserDataDto): Promise<UserType> {

        if (!userData.is_Youtuber && !userData.is_Professional) {
            throw new BadRequestException('User must be either a Youtuber or a Professional');
        }
        // comment gerer les mofdifications de channel youtube (api)
        const youtuberData = userData.is_Youtuber
            ? { update: { tagChannel: userData.tagChannel } }
            : { delete: true };

        //TODO comment gérer les recommandations linkedins pendant la créations?
        const professionalData = userData.is_Professional
            ? { update: { urlLinkedin: userData.urlLikendin, recommandationLinkedin: {} } }
            : { delete: true };

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                userName: userData.userName,
                password: userData.password,
                email: userData.email,
                is_Youtuber: userData.is_Youtuber,
                is_Professional: userData.is_Professional,
                youtuber: youtuberData,
                professional: professionalData,
            },
            include: {
                youtuber: false,
                professional: false,
            },
        });
        return updatedUser;
    }

    async deleteUser(id: number): Promise<any> {
        const deletedUser = await this.prisma.user.delete({
            where: { id },
            include: {
                youtuber: true,
                professional: true,
            },
        });
        return deletedUser;
    }


}
