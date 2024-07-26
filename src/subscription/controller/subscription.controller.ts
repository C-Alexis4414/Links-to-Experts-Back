import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';



@Controller('subscription')
export class SubscriptionController {
constructor(private readonly prismaService: PrismaService){}


    async getFollowedUserByUserName(userName:string){
        const user = await this.prismaService.user.findUnique({where: {userName:userName}})
        if(!user){
            return null;
        }else{
            return await this.prismaService.subscription.findMany({
                where:{
                    subscribeUserId_followedUserId:{
                        followedUserId: user.id,
                    }
                    
                }
            })
        }
    }

    async getSubscriptionByUsername(username:string){

    }

    async subscribe(){}
    async unsubscribe(){}
    async validateSubscription(){}

}