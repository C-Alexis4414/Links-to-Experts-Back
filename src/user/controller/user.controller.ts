// TOOLS
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Req, Res, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBody } from '@nestjs/swagger';

// SERVICES
import { UserService } from '../service/user.service';
import { YoutuberService } from '../service/youtuber.service';
import { ProfessionalService } from '../service/professional.service';
import { CreateUserDto } from '../dto/userData.dto';
// import { ApiSecurity } from '@nestjs/swagger';
import { UserType } from '../type/user.type';
import { request, Request, Response } from 'express';
import { AccessTokenPayload } from 'src/authentification/type/accessTokenPayload.type';
import { AuthGuard } from '@nestjs/passport';


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

    @Get('info')
    async getUserInfo(@Req()request:{user:AccessTokenPayload}): Promise<any> {
        const user = await this.userService.getUserWithDetails(request.user.userId);
        return {
            userName: user.userName,
            email: user.email,
            is_Youtuber: user.is_Youtuber,
            is_Professional: user.is_Professional,
            tagChannel: user.is_Youtuber ? user.youtuber.tagChannel : null,
            urlLinkedin: user.is_Professional ? user.professional.urlLinkedin : null
        };
    }

    @Get('tagChannel')
    async getTagChannel(@Req()request:{user:AccessTokenPayload}): Promise<any> {
        return await this.youtuberService.getTagChannelById(request.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('email')
    async getUserByEmail(@Req()request:{user:AccessTokenPayload}): Promise<UserType> {
        const email = request.user.email;
        if (!email) {
            throw new NotFoundException('Email not found');
        }
        return await this.userService.getByEmail(request.user.email);
    }

    @Get('allUsers')
    async getAllUsers(): Promise<UserType[]> {
        return await this.userService.getAllUser()
    }

    @Post('create')
    async createUser(@Body() userData: CreateUserDto): Promise<UserType> {
        return await this.userService.createUser(userData);
    }


    // @Put('update/:id')
    // async update(
    //     @Param('id') id: string,
    //     @Body() updateUserData: UserDataDto
    // ): Promise<UserType> {
    //     return await this.userService.updateUser(Number(id), updateUserData);
    // }

    @Delete('deleteUser')
    async deleteUser(@Req()request:{user:AccessTokenPayload},@Res({ passthrough: true }) res:Response) {
        await this.userService.deleteUser(request.user.userId);
        res.clearCookie('accessToken');
        return { message: 'User deleted' };
    }
}

