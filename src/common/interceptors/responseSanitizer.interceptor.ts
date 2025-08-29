import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseSanitizerInterceptor implements NestInterceptor {
    private readonly sensitiveKeys = [
        'id',
        'email',
        'password',
        'accessToken',
        'hashRefreshToken',
        'tagChannel',
        'urlLinkedin',
    ];

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map((data) => this.sanitize(data)));
    }

    private sanitize(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map((item) => this.sanitize(item));
        }

        if (obj !== null && typeof obj === 'object') {
            const sanitized = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    if (this.sensitiveKeys.includes(key)) {
                        continue; // Skip sensitive key
                    }
                    sanitized[key] = this.sanitize(obj[key]); // Recursively sanitize
                }
            }
            return sanitized;
        }

        return obj; // Return primitive value as-is
    }
}
