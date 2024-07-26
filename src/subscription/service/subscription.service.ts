import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SubscriptionService {
    private readonly prismaService: PrismaService;

    async subscribe(subscribeUserId: number, followedUserId: number): Promise<any> {
        const exitingSubscription = await this.prismaService.subscription.findUnique({
            where: {
                subscriptionId: {
                    subscribeUserId,
                    followedUserId
                }
            },
        })
    }

    // async getFollowedUserByUserName(userName:string){
    //     const user = await this.prismaService.user.findUnique({where: {userName:userName}})
    //     if(!user){
    //         return null;
    //     }else{
    //         return await this.prismaService.subscription.findMany({
    //             where:{
    //                 subscribeUserId_followedUserId:{
    //                     followedUserId: user.id,
    //                 }

    //             }
    //         })
    //     }
}
