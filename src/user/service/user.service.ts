import { ConflictException, Injectable } from '@nestjs/common';
// import { UserDto } from '../type/user.type';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from '../dto/register.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserDto } from '../dto/getUser.dto';
import * as bcrypt from 'bcrypt';
import { UserType } from '../type/user.type';
import { UserRole } from '@prisma/client';
import { LogInUserDto } from '../dto/logInUser.dto';

@Injectable()
export class UserService {
    private readonly prisma = new PrismaService();

    async getUsers(): Promise<UserDto[]> {
        return await this.prisma.user.findMany();
    }

    async getUser(id: number): Promise<UserDto> {
        return await this.prisma.user.findUnique({ where: { id: Number(id) } });
    }

    async logInUser(logInData: LogInUserDto): Promise<UserDto | null> {
        const user = await this.prisma.user.findFirst({ where: { Username: logInData.Username, Email_address: logInData.Email_address } });
        const isPasswordValid = await bcrypt.compare(logInData.Password, user.Password);
        if (isPasswordValid) {
            return user;
        }
        else { return null; }

    }

    async findName(userName: string): Promise<Partial<UserDto>> {
        const user = await this.prisma.user.findFirst({ where: { First_name: userName } });
        return user
    }

    async registerUser(userData: RegisterDto): Promise<Partial<UserDto>> {

        const newUser = await this.prisma.user.create({
            data: {
                ...userData,
                Salt: await bcrypt.genSalt(),
                Password: await bcrypt.hash(userData.Password, await bcrypt.genSalt()),
                Role: UserRole.USER,
            },
        });

        // if (!newUser) {
        //     throw new ConflictException('Username or email already exists');
        // }
        return {
            id: newUser.id,
            First_name: newUser.First_name,
            Last_Name: newUser.Last_Name,
            Username: newUser.Username,
            Email_address: newUser.Email_address,
            Is_Youtuber: newUser.Is_Youtuber,
            Is_Pro: newUser.Is_Pro,
        };
    }




    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...updateUserDto,
            },
        });
        return updatedUser;

    }

    async deleteUser(id: number): Promise<void> {
        const deleteUser = await this.prisma.user.delete({ where: { id: id } });
    }
}

