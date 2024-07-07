import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { YoutuberService } from '../service/youtuber.service';
import { ProfessionalService } from '../service/professional.service';
import { UserDataDto, CreateUserDto, UserIsProfessional, UserIsYoutuber } from '../dto/userData.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { UserType } from '../type/user.type';
import { YoutuberType } from '../type/youtuber.type';
import { ProfessionalType } from '../type/professional.type';

@ApiSecurity('basic')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly youtuberService: YoutuberService,
        private readonly professionalService: ProfessionalService,
    ) { }

    @Get('id/:id')
    async getUser(@Param('id') id: number): Promise<UserType> {
        return this.userService.getUser(Number(id));
    }

    @Get('name/:name')
    async getUserByName(@Param('name') name: string): Promise<UserType> {
        return await this.userService.getByUserName(name);
    }

    @Get('allUsers')
    async getAllUsers(): Promise<UserType[]> {
        return await this.userService.getAllUser()
    }

    @Post('create')
    async createUser(@Body() userData: CreateUserDto, @Body() isyoutube: UserIsYoutuber, @Body() isPro: UserIsProfessional): Promise<CreateUserDto> {
        return await this.userService.createUser(userData, isyoutube, isPro);
    }

    @Put('update/:id')
    async update(
        @Param('id') id: string,
        @Body() updateUserData: UserDataDto
    ): Promise<UserType> {
        return await this.userService.updateUser(Number(id), updateUserData);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.userService.deleteUser(Number(id));
    }

    @Get('testyoutube/:id')
    async testYoutube(@Param('id') id: number): Promise<YoutuberType> {
        return await this.youtuberService.getTagChannelById(Number(id));
    }

    @Get('testprofessional/:id')
    async testProfessional(@Param('id') id: number): Promise<ProfessionalType> {
        return await this.professionalService.getUrlLinkedinById(Number(id));
    }

    @Get('getAllUserInfo/:id')
    async getAllInfo(@Param('id') id: number): Promise<{ user: UserType, youtuber?: YoutuberType, professional?: ProfessionalType }> {
        const user = await this.userService.getUser(Number(id));
        let youtuber: YoutuberType;
        let professional: ProfessionalType;
        if (user.is_Youtuber) {
            youtuber = await this.youtuberService.getTagChannelById(Number(id));
        }
        if (user.is_Professional) {
            professional = await this.professionalService.getUrlLinkedinById(Number(id));
        }
        return { user, youtuber, professional };
    }

}

