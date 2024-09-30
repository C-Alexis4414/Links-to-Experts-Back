import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CsrfMiddleware } from './middleware/csrf.middleware';
import { CookieParserMiddleware } from './middleware/cookie-parser.middleware';
import { SecurityController } from './controller/security.controller';
import rateLimit from 'express-rate-limit';

const ratelimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit to 100 requests per 15 minutes per IP
    message: 'Too many requests, please try again later.'
});

@Module({
    controllers: [SecurityController],
    providers: [],
})
export class SecurityModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ratelimiter, CookieParserMiddleware, CsrfMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
