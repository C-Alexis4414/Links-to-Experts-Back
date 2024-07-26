import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SubscriptionService {
     private readonly prismaService: PrismaService;

    //  async subscribe(subscribeUserId: number, followedUserId: number): Promise<any> {
    //     const exitingSubscription = await this.prismaService.subscription.findFirst({
    //         where: {
    //             subscriptionId:{
    //                subscribedUserId: subscribedUserId,
    //                followerUserId: followedUserId, 
    //             }
    //         },
    //     })
    //  }
}