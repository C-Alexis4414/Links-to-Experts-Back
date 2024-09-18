// TOOLS
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SERVICES
import { UserService } from '../service/user.service';
import { YoutuberService } from '../service/youtuber.service';
import { ProfessionalService } from '../service/professional.service';
import { CreateUserDto } from '../dto/userData.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { UserType } from '../type/user.type';


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


    // @Put('update/:id')
    // async update(
    //     @Param('id') id: string,
    //     @Body() updateUserData: UserDataDto
    // ): Promise<UserType> {
    //     return await this.userService.updateUser(Number(id), updateUserData);
    // }

    @Delete('deleteById/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.userService.deleteUser(id);
    }
}

