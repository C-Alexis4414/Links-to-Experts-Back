import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Post('chocolate')
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
}

// @Put(':id')
// async updateUser(
//     @Param('id') id: number,
//     @Body('First_name') First_name ?: string,
//     @Body('Last_Name') Last_Name ?: string,
//     @Body('Password') Password ?: string,
//     @Body('Email_address') Email_address ?: string,
//     @Body('Is_Youtuber') Is_Youtuber ?: boolean,
//     @Body('Is_Pro') Is_Pro ?: boolean
// ): Promise < User > {
//     return this.userService.updateUser(
//         id,
//         First_name,
//         Last_Name,
//         Password,
//         Email_address,
//         Is_Youtuber,
//         Is_Pro
//     );
// }

// @Delete(':id')
// async deleteUser(@Param('id') id: number): Promise < User > {
//     return this.userService.deleteUser(id);
// }
// }

