// TOOLS
import { Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

// SERVICES
import { AuthService } from './auth.service';

// DTO
import { AuthDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('AUTHENTICATION')
@Controller('authentication')
export class AuthController {
    constructor(private authService: AuthService) { }

    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // async signIn(@Body() signInDto: signInDto) {
    //     return await this.authService.signInAuth(signInDto.First_name, signInDto.Password);
    // }

    // @UseGuards(AuthGuard)
    // @Get('profile')
    // async getProfile(@Request() req) {
    //     return await req.user;
    // }
    @Get('profile')
    async getUser() {
        return await this.authService.getUser();
    }

    @Post('login')
    async login(@Body() authData: AuthDto) {
        return await this.authService.login(authData);

    }
}