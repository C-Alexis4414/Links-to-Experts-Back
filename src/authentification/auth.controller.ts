// TOOLS
import { Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';

// SERVICES
import { AuthService } from './auth.service';

// DTO
import { signInDto } from './auth.dto';
import { LogInUserDto } from 'src/user/dto/logInUser.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('local'))
    // @UseGuards(AuthGuard)
    @Post('login')
    async signIn(@Body() logInData: LogInUserDto) {
        const user = await this.authService.authenticateUser(logInData);
        if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        return user


    }

    @Get('profile')
    async getProfile(@Request() req) {
        return await req.user;
    }
}