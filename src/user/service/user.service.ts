import { BadRequestException, Injectable } from '@nestjs/common';
import { UserType } from '../type/user.type';
import { PrismaService } from 'src/prisma.service';
import { UserDataDto, CreateUserDto, UserIsProfessional, UserIsYoutuber } from '../dto/userData.dto';

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

    async createUser(userData: CreateUserDto, userIsYoutuber: UserIsYoutuber, userIsPro: UserIsProfessional): Promise<UserType> { //dto pour youtube et pro
        if (!userData.is_Youtuber && !userData.is_Professional) {
            throw new BadRequestException('User must be either a Youtuber or a Professional');
        }
        const newUser = await this.prisma.user.create({
            data: {
                ...userData,
                // if isYoutube ou isPro est vrai alors => create la dépandance
            },
        });
        if (userData.is_Youtuber) {

            // call youtube api to check tag channel

            await this.prisma.youtuber.create({
                data: {
                    userId: newUser.id,
                    tagChannel: userIsYoutuber.tagChannel,
                },
            });
        }

        if (userData.is_Professional) {
            await this.prisma.professional.create({
                data: {
                    userId: newUser.id,
                    urlLinkedin: userIsPro.urlLikendin,
                    recommandationLinkedin: '{}', // Ajoutez les autres champs nécessaires
                },
            });
        }
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

