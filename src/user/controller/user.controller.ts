// TOOLS
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Req, Res, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBody } from '@nestjs/swagger';

// SERVICES
import { UserService } from '../service/user.service';
import { YoutuberService } from '../service/youtuber.service';
import { ProfessionalService } from '../service/professional.service';
import { CreateUserDto } from '../dto/userData.dto';
// import { ApiSecurity } from '@nestjs/swagger';
import { UserType } from '../type/user.type';
import { UpdateUserDataDto } from '../dto/updateUserData';
import { request, Request, Response } from 'express';
import { AccessTokenPayload } from 'src/authentification/type/accessTokenPayload.type';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/authentification/decorator/public.decorator';

@ApiTags('USER')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly youtuberService: YoutuberService,
        private readonly professionalService: ProfessionalService,
    ) { }

    @Get('testCallApi/:userName')
    async testCallApi(@Param('userName') userName: string): Promise<any> { 
        return await this.userService.verifyLinkedinSkills(userName);
    }

    @Get('id/:id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserType> {
        return this.userService.getUser(id);
    }

    // @Get('name')
    // async getUserByName(@Req()request:{user:AccessTokenPayload}): Promise<UserType> {
    //     return await this.userService.getByUserName(request.user.userName);
    // }

    @Get('info')
    async getUserInfo(@Req()request:{user:AccessTokenPayload}): Promise<any> {
        const user = await this.userService.getUserWithDetails(request.user.userId);
        
        const likes = user.likes.map(like => ({
            id: like.categoryId,
            name: like.category.name
        }));

        return {
            id: user.id,
            userName: user.userName,
            email: user.email,
            is_Youtuber: user.is_Youtuber,
            is_Professional: user.is_Professional,
            tagChannel: user.is_Youtuber ? user.youtuber.tagChannel : null,
            urlLinkedin: user.is_Professional ? user.professional.urlLinkedin : null,
            followersCount: user._count.followers,
            subscriptionsCount: user._count.subscriptions,
            likes
        };
    }

    @Get('search')
    async searchUsers(
        @Query('name') name: string,
        @Req() request: { user: AccessTokenPayload }
    ) {
        const currentUserId = request.user.userId;
        return this.userService.searchUsersByName(name, currentUserId);
    }


    @Get('allUsers')
    async getAllUsers(): Promise<UserType[]> {
        return await this.userService.getAllUser()
    }

    @Post('create')
    async createUser(@Body() userData: CreateUserDto): Promise<UserType> {
        return await this.userService.createUser(userData);
    }


    @Put('update')
    async update(
        @Req() request: { user: AccessTokenPayload },
        @Body() updateUserData: UpdateUserDataDto,
    ): Promise<UserType> {
        return await this.userService.updateUser(request.user.userId, updateUserData);
    }

    // @Delete('deleteUser')
    // async deleteUser(@Req()request:{user:AccessTokenPayload},@Res({ passthrough: true }) res:Response) {
    //     await this.userService.deleteUser(request.user.userId);
    //     res.clearCookie('accessToken');
    //     return { message: 'User deleted' };
    // @Put('update/:id')
    // async update(
    //     @Param('id') id: string,
    //     @Body() updateUserData: UserDataDto
    // ): Promise<UserType> {
    //     return await this.userService.updateUser(Number(id), updateUserData);
    // }

    @UseGuards(AuthGuard('delete'))
    @Delete('deleteUser')
    async deleteUser(@Req()request:{user:AccessTokenPayload},@Res({ passthrough: true }) res:Response) {
        try {
            console.log('Request user:', request.user);
            await this.userService.deleteUser(request.user.userId);
            res.clearCookie('accessToken');
            return { message: 'User deleted' };
        } catch (error) {
            console.error('Error in deleteUser controller:', error);
            throw error;
        }
    }
}

