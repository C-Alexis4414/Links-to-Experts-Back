// NEST
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

// TYPE
import { UserType, } from '../type/user.type';

// SERVICE
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

//DTO
import { CreateUserDto } from '../dto/userData.dto';
import axios from 'axios';
import { UpdateUserDataDto } from '../dto/updateUserData';
import { YoutuberType } from '../type/youtuber.type';
import { ProfessionalType } from '../type/professional.type';

@Injectable()
export class UserService {
    private readonly prisma = new PrismaService();

    // find a user by id
    async getUser(id: number): Promise<User> {
        return await this.prisma.user.findUnique({ where: { id: id } });
    }

    // find a user by name
    async getByUserName(name: string): Promise<UserType> {
        const getName = await this.prisma.user.findUnique({ where: { userName: name } });
        return getName;
    }

    async getUserWithDetails(userId: number): Promise<any> { // User & { youtuber?: YoutuberType; professional?: ProfessionalType}>
        return await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                userName: true,
                email: true,
                is_Youtuber: true,
                is_Professional: true,
                youtuber: {
                    select: {
                        tagChannel: true
                    }},
                professional: {
                    select: {
                        urlLinkedin: true
                    }},
                _count: {
                    select: {
                        followers: true,
                        subscriptions: true,
                        }
                    },
                likes: {
                    take: 5,
                    select: {
                        categoryId: true,
                        category: {
                            select: {
                                name: true
                            },
                        }
                    }
                },
            }
        });
    }

    // find all users
    async getAllUser(): Promise<UserType[]> {
        return await this.prisma.user.findMany();
    }

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

        if (!channelId) {
            throw new HttpException('Invalid Youtube Channel', HttpStatus.BAD_REQUEST);
        }
        const url = "https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=" + channelId + "&key=" + apiKey;
        try {
            const response = await axios.get(url);
            const channels = response.data.items;
            return channels && channels.length > 0;
        } catch (error) {
            return false;
        }
    }

    /* methode 1
    Real-Time LinkedIn Scraper API
    ne renvoie pas toutes les données
    doit gérer regex 
    nb d'appel/mois : 10
    */
    
    async verifyLinkedinSkills(userName: string): Promise<any> {
        const options = {
            method: 'GET',
            url: process.env.URL_LINKEDIN_SCRAPER,
            params: {
                username: userName
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': process.env.REQUEST_LINKEDIN_SCRAPER_HOST
            }
        };

        try {
            const response = await axios.request(options);
            const skills = response.data.skills;
            // Filtrer les compétences ayant la propriété endorsementsCount et récupérer les noms
            const endorsedSkills = skills
                .filter((skill: any) => skill.endorsementsCount)
                .map((skill: any) => skill.name);

            return [skills, endorsedSkills]
        } catch (error) {
            console.error(error);
        }
    }
    
    async createUser(userData: CreateUserDto): Promise<User> { //dto pour youtube et pro

        if (!userData.is_Youtuber && !userData.is_Professional) {
            throw new BadRequestException('User must be either a Youtuber or a Professional');
        }

        if (userData.is_Youtuber) {
            const isValidChannel = await this.verifyYTChannel(userData.tagChannel);
            if (!isValidChannel) {
                throw new BadRequestException('Invalid Youtube Channel');
            }
        }
        const youtuberData = userData.is_Youtuber
            ? { create: { tagChannel: userData.tagChannel } }
            : undefined;

        //TODO comment gérer les recommandations linkedins pendant la créations?
        const professionalData = userData.is_Professional
            ? { create: { urlLinkedin: userData.urlLinkedin, recommandationLinkedin: {} } }
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
                // likes: true, à vérifier l'utilité de cet argument
            },
        });

        return newUser;
    }
    // TODO: gérer la modifications des données et les relations queries
    async updateUser(id: number, userData: UpdateUserDataDto): Promise<UserType> {
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