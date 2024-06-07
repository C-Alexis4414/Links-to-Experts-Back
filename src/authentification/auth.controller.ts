// TOOLS
import { Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

// SERVICES
import { AuthService } from './auth.service';

// DTO
import { signInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: signInDto) {
        return await this.authService.signInAuth(signInDto.First_name, signInDto.Password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return await req.user;
    }
}