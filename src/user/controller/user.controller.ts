// TOOLS
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SERVICES
import { UserService } from '../service/user.service';
import { YoutuberService } from '../service/youtuber.service';
import { ProfessionalService } from '../service/professional.service';
import { UserDataDto, CreateUserDto, LinkedinDto } from '../dto/userData.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { UserType } from '../type/user.type';


@ApiTags('USER')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly youtuberService: YoutuberService,
        private readonly professionalService: ProfessionalService,
    ) { }

    // TODO @query
    // @Get('password/:password')
    // async hashage(@Param('password') password: string): Promise<string> {
    //     return await this.userService.hash(password);
    // }
    /*methode1
        @Get('testCallApi/:userName')
         async testCallApi(@Param('userName') userName: string): Promise<any> { 
          return await this.userService.verifyLinkedinSkills(userName);
         */

    @Post('testCallApi/:userName')
    async testCallApi(@Body() userName: LinkedinDto): Promise<any> {
        return await this.userService.verifyLinkedinSkills(userName);
    }

    @Get('id/:id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserType> {
        return this.userService.getUser(id);
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
    async createUser(@Body() userData: CreateUserDto): Promise<UserType> {
        return await this.userService.createUser(userData);
    }


    @Put('update/:id')
    async update(
        @Param('id') id: string,
        @Body() updateUserData: UserDataDto
    ): Promise<UserType> {
        return await this.userService.updateUser(Number(id), updateUserData);
    }

    @Delete('deleteById/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.userService.deleteUser(id);
    }


    // @Put('update/:id')
    // async update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateUserData: UserDataDto
    // ): Promise<UserType> {
    //     return await this.userService.updateUser(id, updateUserData);
    // }

    // @Get('testyoutube/:id')
    // async testYoutube(@Param('id') id: number): Promise<YoutuberType> {
    //     return await this.youtuberService.getTagChannelById(Number(id));
    // }

    // @Get('testprofessional/:id')
    // async testProfessional(@Param('id') id: number): Promise<ProfessionalType> {
    //     return await this.professionalService.getUrlLinkedinById(Number(id));
    // }
    // // recupère toutes les infos d'un utilisateur --- ne marche pas vraiment
    // @Get('getAllUserInfo/:id')
    // async getAllInfo(@Param('id') id: number): Promise<{ user: UserType, youtuber?: YoutuberType, professional?: ProfessionalType }> {
    //     const user = await this.userService.getUser(Number(id));
    //     let youtuber: YoutuberType;
    //     let professional: ProfessionalType;
    //     if (user.is_Youtuber) {
    //         youtuber = await this.youtuberService.getTagChannelById(Number(id));
    //     }
    //     if (user.is_Professional) {
    //         professional = await this.professionalService.getUrlLinkedinById(Number(id));
    //     }
    //     return { user, youtuber, professional };
    // }

}

