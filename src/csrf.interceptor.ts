import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CsrfInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    // Added a CSRF header for each query
    request.headers['X-CSRF-TOKEN'] = process.env.CSRF_TOKEN;

    return next.handle().pipe(tap(() => {}));
  }
}

