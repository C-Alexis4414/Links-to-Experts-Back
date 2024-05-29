import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/getUser.dto';
import { UpdateUserDto } from '../dto/updateUer.dto';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('getUsers')
    async getUsers(): Promise<UserDto[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<UserDto> {
        return this.userService.getUser(id);
    }

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const newUser = await this.userService.createUser(createUserDto);
        return newUser;
    }

    @Put('update/:id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UpdateUserDto> {
        return this.userService.updateUser(Number(id), updateUserDto);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        const deleteUser = await this.userService.deleteUser(Number(id));
    }
}

