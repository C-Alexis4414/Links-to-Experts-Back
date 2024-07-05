// TOOLS
import { Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '../guard/auth.guard';

// SERVICES
import { AuthService } from '../service/auth.service';

// DTO
import { signInDto } from '../dto/auth.dto';
import { LogInUserDto } from 'src/user/dto/logInUser.dto';
import { LocalAuthGuard } from '../guard/local_auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('local'))

    @Post('login')
    async signIn(@Body() logInData: LogInUserDto) {
        const user = await this.authService.authenticateUser(logInData);
        if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        return user


    }
    // @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req) {
        console.log('req.user', req.user);

        return await req.user;
    }
}