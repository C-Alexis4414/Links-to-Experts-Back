import { Injectable } from "@nestjs/common";
import { IsNumber } from "class-validator";
import { PrismaService } from "src/prisma.service";


@Injectable()
export class SubscriptionService {
    private readonly prisma = new PrismaService();
    constructor() { }

    async getAll() {
        const toto = await this.prisma.subscription.findMany()
        return toto;
    }

    async subscribe(subscribeUserId: number, followedUserId: number): Promise<any> {
        const exitingSubscription = await this.prisma.subscription.findUnique({
            where: {
                subscriptionId: {
                    subscribeUserId,
                    followedUserId
                }
            },
        })

        if (!exitingSubscription) {
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
        })
        if (!user) {
            return user
        } else {
            return await this.prisma.subscription.findMany({
                where: {
                    subscribeUserId: user.id
                }
            })
        }
    }
}
