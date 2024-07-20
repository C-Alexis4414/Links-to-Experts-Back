import { BadRequestException, Injectable } from '@nestjs/common';
import { UserType } from '../type/user.type';
import { PrismaService } from 'src/prisma.service';
import { UserDataDto, CreateUserDto, UserIsProfessional, UserIsYoutuber } from '../dto/userData.dto';

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
    //TODO gérrer la creation des entités youtuber et professional pendant la création 
    async createUser(userData: CreateUserDto): Promise<UserType> { //dto pour youtube et pro
        if (!userData.is_Youtuber && !userData.is_Professional) {
            throw new BadRequestException('User must be either a Youtuber or a Professional');
        }
        console.log(userData);

        const youtuberData = userData.is_Youtuber
            ? { create: { tagChannel: userData.tagChannel } }
            : undefined;

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
        // if (userData.is_Youtuber) {

        //     // call youtube api to check tag channel

        //     await this.prisma.youtuber.create({
        //         data: {
        //             userId: newUser.id,
        //             tagChannel: userData.tagChannel,
        //         },
        //     });
        // }

        // if (userData.is_Professional) {
        //     await this.prisma.professional.create({
        //         data: {
        //             userId: newUser.id,
        //             urlLinkedin: userData.urlLikendin,
        //             recommandationLinkedin: '{}', // Ajoutez les autres champs nécessaires
        //         },
        //     });
        // }
        return newUser;
    }
    // TODO: gérer les donées user, youtuber et professional
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
    //TODO  si un compte user est effacer il faut effacer toute les donnée auquel il est lié
    async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id: id } });
    }

}
