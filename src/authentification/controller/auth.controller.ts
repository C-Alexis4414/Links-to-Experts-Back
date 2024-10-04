// TOOLS
import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

// GUARDS
import { JwtAuthGuard } from '../jwt-auth.guard';

// SERVICES
import { AuthService } from '../service/auth.service';
import { UserService } from 'src/user/service/user.service';

// DTO
import { AuthLoginDto} from '../dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/userData.dto';

// TYPE
import { RequestWithUserPayload } from '../type/auth.type';


@ApiTags('AUTHENTICATION')
@Controller('authentication')
export class AuthController {
    constructor(private authService: AuthService, private readonly userService: UserService

    ) { }

    //1. envoie un mot de passe et un email
    //2. l'api renvoie un token sécurisé avec le bon mot de passe
    @Post('login')
    async login(@Body() authLogin: AuthLoginDto) {
        return await this.authService.login(authLogin);
    }

    @ApiHeader({
        name: 'X-CSRF-Token',
        description: 'CSRF token',
    })

    @Post('register')
    async register(@Body() userData: CreateUserDto) {
        return await this.authService.register(userData);
    }

    //3. on renvoie le token securise qui correspond à l'utilisateur qui a été identifier precedement  
    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticate(@Request() request: RequestWithUserPayload) {
        return await this.userService.getByUserName(request.user.userName)
    }

}