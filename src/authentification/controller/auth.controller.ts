// TOOLS
import { Controller, Post, Get, UseGuards, Req, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorator/public.decorator';

// GUARDS
import { RefreshAccessTokenGuard } from '../guards/refreshAcces.guard';

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
        const token = await this.authService.register(req.body);
        res.cookie(
          'accessToken',
          token.accessToken,
          {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 15 * 60 * 1000) // <= 15minutes
          }
        );
         res.send({ status: 'user connect' });
        return token
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
        const token = await this.authService.getToken(req.user)
        res.cookie(
            'accessToken',
            token.accessToken,
            {
              httpOnly: true,
              secure: false,
              sameSite: 'lax',
              expires: new Date(Date.now() + 15 * 60 * 1000) // <= 15minutes
            }
          );
         
          
          res.send({ status: 'user connect' });
          return token
    }

  @Public()
  @UseGuards(RefreshAccessTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async getRefreshTokens(@Req() req:Request,@Res({ passthrough: true }) res:Response) {
  const token = await this.authService.refreshToken(req.cookies.accessToken)
    res.cookie(
      'accessToken',
      token.accessToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 15 * 60 * 1000) // <= 15minutes
      }
    );
}

 
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
    return { message: `user  has been logged out` }
}
}