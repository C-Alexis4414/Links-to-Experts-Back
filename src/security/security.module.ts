import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CsrfMiddleware } from './middleware/csrf.middleware';
import { CookieParserMiddleware } from './middleware/cookie-parser.middleware';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

@Module({})
export class SecurityModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CsrfMiddleware)
            .forRoutes('*')

            .apply(CookieParserMiddleware)
            .forRoutes('*')

            .apply(RateLimitMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
