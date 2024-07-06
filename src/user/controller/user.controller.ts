import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDataDto } from '../dto/UserData.dto';
import { CreateUserDto } from '../dto/createUser.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { UserType } from '../type/user.type';

@ApiSecurity('basic')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

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
    async createUser(@Body() userData: CreateUserDto): Promise<CreateUserDto> {
        return await this.userService.createUser(userData);
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
}

