import { BadRequestException, Injectable } from '@nestjs/common';
import { UserType } from '../type/user.type';
import { PrismaService } from 'src/prisma.service';
import { UserDataDto, CreateUserDto } from '../dto/userData.dto';

@Injectable()
export class UserService {
    private readonly prisma = new PrismaService();

    /*
    TODO
    log in logout
    sign in
    password hash
    verify user

    encours : modifications de update afin de gerer les creations modifications ou suppression dans les tables youtuber,professional ...
    */



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
                subscriptions: true,
                likes: true,
                followers: true
            },
        });
        return newUser;
    }

    // delete user and all datas associate
    async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
            include: {
                youtuber: true,
                professional: true,
                subscriptions: true,
                followers: true,
                likes: true
            },
        });
        ;
    }


    // TODO: gérer la modifications des données et les relations queries
    // async updateUser(id: number, userData: UserDataDto): Promise<UserType> {
    //     if (!userData.is_Youtuber && !userData.is_Professional) {
    //         throw new BadRequestException('User must be either a Youtuber or a Professional');
    //     }
    //     // comment gerer les mofdifications de channel youtube (api)
    //     const youtuberData = userData.is_Youtuber
    //         ? { update: { tagChannel: userData.tagChannel } }
    //         : { delete: true };

    //     //TODO comment gérer les recommandations linkedins pendant la créations?
    //     const professionalData = userData.is_Professional
    //         ? { update: { urlLinkedin: userData.urlLikendin, recommandationLinkedin: {} } }
    //         : { delete: true };

    //     const updatedUser = await this.prisma.user.update({
    //         where: { id },
    //         data: {
    //             userName: userData.userName,
    //             password: userData.password,
    //             email: userData.email,
    //             is_Youtuber: userData.is_Youtuber,
    //             is_Professional: userData.is_Professional,
    //             youtuber: youtuberData,
    //             professional: professionalData,
    //         },
    //         // include: {
    //         //     youtuber: true,
    //         //     professional: true,
    //         // },
    //     });
    //     return updatedUser;
    // }

    //exemple code  generer =>
    // async updateUser(id: number, userData: UserDataDto): Promise<any> {
    //     const user = await this.prisma.user.findUnique({
    //         where: { id },
    //         include: {
    //             youtuber: true,
    //             professional: true,
    //         },
    //     });

    //     if (!user) {
    //         throw new NotFoundException('User not found');
    //     }

    //     if (!userData.is_Youtuber && !userData.is_Professional) {
    //         throw new BadRequestException('User must be either a Youtuber or a Professional');
    //     }

    //     const [updatedUser, youtuberUpdate, professionalUpdate] =
    //         await this.prisma.$transaction([
    //             this.prisma.user.update({
    //                 where: { id },
    //                 data: {
    //                     userName: userData.userName,
    //                     password: userData.password,
    //                     email: userData.email,
    //                     is_Youtuber: userData.is_Youtuber,
    //                     is_Professional: userData.is_Professional,
    //                 },
    //             }),
    //             userData.is_Youtuber
    //                 ? this.prisma.youtuber.upsert({
    //                     where: { userId: id },
    //                     update: { tagChannel: userData.tagChannel },
    //                     create: { userId: id, tagChannel: userData.tagChannel },
    //                 })
    //                 : this.prisma.youtuber.delete({ where: { userId: id } }),
    //             userData.is_Professional
    //                 ? this.prisma.professional.upsert({
    //                     where: { userId: id },
    //                     update: { urlLinkedin: userData.urlLikendin, recommandationLinkedin: {} },
    //                     create: { userId: id, urlLinkedin: userData.urlLikendin, recommandationLinkedin: {} },
    //                 })
    //                 : this.prisma.professional.delete({ where: { userId: id } }),
    //         ]);

    //     return {
    //         ...updatedUser,
    //         youtuber: youtuberUpdate,
    //         professional: professionalUpdate,
    //     };
    // }


}
