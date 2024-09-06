// NEST
import { Injectable } from '@nestjs/common';

// SERVICE
import { PrismaService } from 'src/prisma.service';



@Injectable()
export class SubscriptionService {
    private readonly prisma = new PrismaService();
    constructor() { }

    /**
     * 
     * TODO:
     *  valider les return des fonctions subscribe et getfollowedUser
     */

    async subscribe(subscribeUserId: number, followedUserId: number): Promise<any> {
        const existingSubscription = await this.prisma.subscription.findUnique({
            where: {
                subscriptionId: {
                    subscribeUserId,
                    followedUserId
                }
            },
        })

        if (!existingSubscription) {
            return await this.prisma.subscription.create({
                data: {
                    subscribeUserId,
                    followedUserId
                }
            });
        } else {
            return await this.prisma.subscription.delete({
                where: {
                    subscriptionId: {
                        subscribeUserId,
                        followedUserId
                    }
                },
            })
        }
    }

    async getFollowedUserByUserName(userName: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                userName: userName
            }
        });

        if (!user) {
            return null;
        }

        return await this.prisma.subscription.findMany({
            where: {
                subscribeUserId: user.id
            },
            select: {
                followedUser: {
                    select: {
                        id: true,
                        userName: true
                    }
                }
            }
        });
    }
}