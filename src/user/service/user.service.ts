// NEST
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';

// TYPE
import { UserType, } from '../type/user.type';

// SERVICE
import { PrismaService } from 'src/prisma.service';

//DTO
import { CreateUserDto, UserDataDto } from '../dto/userData.dto';
import axios from 'axios';

// interface SignupParams {
//     email: string;
//     password: string;
// }

@Injectable()
export class UserService {
    private readonly prisma = new PrismaService();

    /*
    TODO
    log in logout
    sign in
    password hash
    verify user
    utilisé le selecte ou include pour recuperer uniquemet la donnée necessaire
    encours : modifications de update afin de gerer les creations modifications ou suppression dans les tables youtuber,professional ...
    bug: creation d'un user qui est juste professionnale ou youtuber, un bug s'affiche dans la console mais les données sont quand meme creer
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

    // async getByEmail(email: string): Promise<UserType> {
    //     const getUserByEmail = await this.prisma.user.findUnique({ where: { email: email } });
    //     return getUserByEmail;
    // }

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
    // }

    // }

    async extractChannelId(tagChannel: string): Promise<string> {
        // Extraction of the id by handle of the string from the url
        const regex = /@([a-zA-Z0-9_-]+)/;
        const match = tagChannel.match(regex);
        console.log(match);
        return match ? match[1] : null;
    }

    async verifyYTChannel(tagChannel: string): Promise<boolean> {
        const apiKey = process.env.YOUTUBE_API_KEY;
        const channelId = await this.extractChannelId(tagChannel);
        // 
        if (!channelId) {
            throw new HttpException('Invalid Youtube Channel', HttpStatus.BAD_REQUEST);
        }
        const url = "https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=" + channelId + "&key=" + apiKey;
        try {
            const response = await axios.get(url);
            const channels = response.data.items;
            // console.log(response.data);
            // console.log(channels);
            return channels && channels.length > 0;
        } catch (error) {
            return false; // in case of error, the string is not valid
        }
    }

    async createUser(userData: CreateUserDto): Promise<UserType> { //dto pour youtube et pro

        if (!userData.is_Youtuber && !userData.is_Professional) {
            throw new BadRequestException('User must be either a Youtuber or a Professional');
        }

        // if (userData.is_Youtuber) {
        //     const isValidChannel = await this.verifyYTChannel(userData.tagChannel);
        //     if (!isValidChannel) {
        //         throw new BadRequestException('Invalid Youtube Channel');
        //     }
        // }

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
                likes: true,
            },
        });

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
            include: {
                youtuber: true,
                professional: true,
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
                subscriptions: true,
                followers: true,
                likes: true
            },
        });
        ;
    }
}

