import { ExceptionFilter, Catch, ArgumentsHost, ForbiddenException } from '@nestjs/common';

@Catch(ForbiddenException)
export class CsrfExceptionFilter implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        // Return a custom message for csrf errors
        response.status(403).json({ 
            message: 'ERROR 403 - CSRF token is invalid, please pass it in the header of the request' 
        });
    }
}