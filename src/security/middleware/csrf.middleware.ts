import { Injectable, NestMiddleware } from '@nestjs/common';
import * as csurf from 'csurf';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    csurf({ cookie: {
      httpOnly: true, // Prevents access to the cookie via JavaScript
      // secure: process.env.NODE_ENV === 'production', Use only in HTTPS in production
      sameSite: 'strict', // Protection against CSRF attacks via third-party sites
      maxAge: 3600, // 1 hour
    } })(req, res, next);
  }
}
