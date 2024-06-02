import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/getUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { RegisterDto } from '../dto/register.dto';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('basic')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('getUsers')
    async getUsers(): Promise<UserDto[]> {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<UserDto> {
        return await this.userService.getUser(id);
    }

    @Post('register')
    async createUser(@Body() createUserDto: RegisterDto): Promise<Partial<UserDto>> {
        const newUser = await this.userService.registerUser(createUserDto);
        return newUser;
    }

    @Put('update/:id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UpdateUserDto> {
        return await this.userService.updateUser(Number(id), updateUserDto);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        const deleteUser = await this.userService.deleteUser(Number(id));
    }
}

