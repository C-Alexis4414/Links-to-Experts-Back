// TOOLS
import { Controller, Post, Get, UseGuards, Req, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorator/public.decorator';

// GUARDS

// SERVICES
import { AuthService } from '../service/auth.service';

// DTO
import { CreateUserDto } from 'src/user/dto/userData.dto';

// TYPE
import { AccessTokenPayload } from '../type/accessTokenPayload.type';



@ApiTags('AUTHENTICATION')
@Controller('authentication')
export class AuthController {
    constructor(
      private authService: AuthService, 
    ) { }

    @Public()
    @Post('signUp')
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({
      description: 'Créer un nouvel utilisateur en fournissant les détails comme le nom, l\'email et d\'autres informations.',
      examples: {
          exemple: {
              value: {
                  userName: 'TotoUser',
                  password: '12345678',
                  email: 'toto@toto.com',
                  is_Youtuber: false,
                  is_Professional: true,
                  tagChannel: '@totoChannel',
                  urlLikendin: 'https://linkedin.com/in/toto'
              }
          }
      }
    })
      async signUp(@Req() req: Request & { user?: CreateUserDto } ,@Res({passthrough: true}) res: Response) {
        const tokens = await this.authService.register(req.body);
        res.cookie(
          'accessToken',
          tokens.accessToken,
          {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 15 * 60 * 1000) // <= 15minutes
          }
        );
        res.cookie(
          'refreshToken',
          tokens.refreshToken,
          {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //  cookie expire dans 7 jours
          }
        );
         // res.send({ status: 'user connect' });
        return tokens
    }

    @Public()
    @UseGuards(AuthGuard('login'))
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        description: 'test pour générer un JWT si l\'utilisateur existe dans la base de donnée et creer un Cookie avec token d\acces (http only)',
        examples: {
          exemple: {
            value: {
              email: 'toto@toto.com',
              password: '12345678'
            }
          }
        }
      })
    async login(@Req() req: Request & { user?: AccessTokenPayload },
                @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.getToken(req.user)
        res.cookie(
            'accessToken',
            tokens.accessToken,
            //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRvdG9Vc2VyIiwidXNlcklkIjoyMCwiaWF0IjoxNzI5MzQ3MzUwLCJleHAiOjE3MjkzNDc0NzB9.IWBLYK8zjCOdUCz2fhaj_e12EpmUEWPh0rWUMeChtVY',
            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRvdG9Vc2VyIiwidXNlcklkIjoyMCwiaWF0IjoxNzI5MzQ2NTg0LCJleHAiOjE3MjkzNDY2MjR9.rX-lv1_dIpZ4xR8hyI_iQAuVUKX5LCKGWNG3NdrJOx0
            {
              httpOnly: true,
              secure: false,
              sameSite: 'lax',
              expires: new Date(Date.now() + 15 * 60 * 1000) // <= 15minutes
            }
          );
          res.cookie(
            'refreshToken',
            tokens.refreshToken,
            {
              httpOnly: true,
              secure: false,
              sameSite: 'lax',
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //  cookie expire dans 7 jours
            }
          );
          // res.send({ status: 'user connect' });
          return tokens
    }

  @Public()
  @UseGuards(AuthGuard('rtStrategy'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async getRefreshTokens(@Req() req:Request,@Res({ passthrough: true }) res:Response) {
  const tokens = await this.authService.refreshToken(req.cookies.refreshToken)
    res.cookie(
      'accessToken',
      tokens.accessToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        // expires: new Date(Date.now() + 15 * 60 * 1000) // <= 15minutes
        expires: new Date(Date.now() + 1 * 60 * 1000) // <= 1 minute
      }
    );
    res.cookie(
      'refreshToken',
      tokens.refreshToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //  cookie expire dans 7 jours
        expires: new Date(Date.now() + 2 * 60 * 1000) // <= 2 minutes
      }
    );
}

 // this route is protected by accessToken guard deploy in app.module
 @Get('protected')
 @HttpCode(HttpStatus.OK)
 getProtected() {
   return { message: 'This is a protected route.' };
 }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req:Request ,@Res({ passthrough: true }) res:Response) {
    await this.authService.logout(req.cookies.accessToken)
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: `user  has been logged out` }
}
}