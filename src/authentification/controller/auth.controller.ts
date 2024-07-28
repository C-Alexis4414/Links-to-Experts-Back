// TOOLS
import { Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

// SERVICES
import { AuthService } from '../service/auth.service';

// DTO
import { AuthLoginDto, AuthPayloadDto } from '../dto/auth.dto';


import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { RequestWithUserPayload } from '../type/auth.type';
@ApiTags('AUTHENTICATION')

@Controller('authentication')
export class AuthController {
    constructor(private authService: AuthService) { }

    //1. envoie un mot de passe et un email
    //2. l'api renvoie un token sécurisé avec le bon mot de passe
    @Post('login')
    async login(@Body() authLogin: AuthLoginDto) {
        return await this.authService.login(authLogin);
    }

    //3. on renvoie le token securise qui correspond à l'utilisateur qui a été identifier precedement  
    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticate(@Request() request: RequestWithUserPayload) {
        console.log(request.user);

        return 'a'
    }

}