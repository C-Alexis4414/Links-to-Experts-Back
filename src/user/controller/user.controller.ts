import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('getUsers')
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User> {
        return this.userService.getUser(id);
    }

    @Post('create')
    async createUser(): Promise<User> {
        const data = {
            "First_name": "gianni",
            "Last_Name": "accardi",
            "Password": "dlkcjdiocjlkd",
            "Email_address": "jhsciudhc@djbghz.com",
            "Is_Youtuber": false,
            "Is_Pro": true
        }
        const newUser = await this.userService.createUser(data.First_name, data.Last_Name, data.Password, data.Email_address, data.Is_Youtuber, data.Is_Pro);
        return newUser
    }


    @Put('update')
    async updateUser(
        // @Param('id') id: number,
        // @Param('First_name') First_name?: string,
        // @Param('Last_Name') Last_Name?: string,
        // @Param('Password') Password?: string,
        // @Param('Email_address') Email_address?: string,
        // @Param('Is_Youtuber') Is_Youtuber?: boolean,
        // @Param('Is_Pro') Is_Pro?: boolean
    ): Promise<User> {
        const id = 7
        const First_name = "henry";
        const updateUser = await this.userService.updateUser(
            id,
            First_name,
            // Last_Name,
            // Password,
            // Email_address,
            // Is_Youtuber,
            // Is_Pro
        );
        return updateUser;
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number): Promise<User> {
        return this.userService.deleteUser(id);
    }
}

