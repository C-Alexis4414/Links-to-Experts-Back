import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserType } from '../type/user.type';
import { PrismaService } from 'src/prisma.service';
import { UserDataDto, CreateUserDto } from '../dto/userData.dto';
import * as bcrypt from 'bcrypt';

// interface SignupParams {
//     email: string;
//     password: string;
// }

@Injectable()
export class UserService {
    private readonly prisma = new PrismaService();

    // async hash(password: string): Promise<string> {
    //     const salt = await bcrypt.genSalt(10);
    //     return await bcrypt.hash(password, salt);
    // }

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
    //TODO gérer la creation des entités youtuber et professional pendant la création
    // async signup({ email, password }: SignupParams) {
    //     const userExists = await this.prisma.user.findUnique({
    //         where: {
    //             email,
    //         },
    //     });

    //     if (userExists) {
    //         throw new ConflictException();
    //     }

    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     console.log(hashedPassword);
    // }
    async createUser(userData: CreateUserDto): Promise<UserType> { //dto pour youtube et pro
        if (!userData.is_Youtuber && !userData.is_Professional) {
            throw new BadRequestException('User must be either a Youtuber or a Professional');
        }
        console.log(userData);

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        console.log(hashedPassword);

        const newUser = await this.prisma.user.create({
            data: {
                password: hashedPassword,
                userName: userData.userName,
                email: userData.email,
                is_Youtuber: userData.is_Youtuber,
                is_Professional: userData.is_Professional
                // if isYoutube ou isPro est vrai alors => create la dépandance
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
    // TODO: gérer la modifications des données et les relations queries
    async updateUser(id: number, userData: UserDataDto): Promise<UserType> {
        if (!userData.is_Youtuber && !userData.is_Professional) {
            throw new BadRequestException('User must be either a Youtuber or a Professional');
        }
        // comment gerer les mofdifications de channel youtube (api)
        // const youtuberData = userData.is_Youtuber
        //     ? { update: { tagChannel: userData.tagChannel } }
        //     : { delete: true };

        //TODO comment gérer les recommandations linkedins pendant la créations?
        // const professionalData = userData.is_Professional
        //     ? { update: { urlLinkedin: userData.urlLikendin, recommandationLinkedin: {} } }
        //     : { delete: true };

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                userName: userData.userName,
                password: userData.password,
                email: userData.email,
                is_Youtuber: userData.is_Youtuber,
                is_Professional: userData.is_Professional,
                // youtuber: youtuberData,
                // professional: professionalData,
            },
            // include: {
            //     youtuber: true,
            //     professional: true,
            // },
        });
        return updatedUser;
    }

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

    async deleteUser(id: number): Promise<any> {
        const deletedUser = await this.prisma.user.delete({
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
}
