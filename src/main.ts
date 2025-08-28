import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ResponseSanitizerInterceptor } from './common/interceptors/responseSanitizer.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const isProd = process.env.NODE_ENV === 'production';
    app.use(cookieParser());

    app.use(
        helmet({
            contentSecurityPolicy: isProd,
        }),
    );

    app.use((req, res, next) => {
        // console.log(`Incoming request: ${req.method} ${req.url}`);
        next();
    });

    app.useGlobalInterceptors(new ResponseSanitizerInterceptor());

    const config = new DocumentBuilder()
        .setTitle('Swagger Links-to-experts')
        .setDescription('testing API address')
        .setVersion('1.0')
        .addServer('http://localhost:3000', 'Local dev')
        .addServer('https://youlink.app/api', 'Production')
        .addTag('links')
        // .addCookieAuth('csrf-token', {
        //   type: 'apiKey',
        //   in: 'cookie',
        //   name: 'X-CSRF-TOKEN',
        //   description: 'CSRF token for protection',
        // })
        // .addApiKey({
        //   type: 'apiKey',
        //   name: 'X-CSRF-TOKEN',
        //   in: 'header',
        //   description: 'CSRF protection token',
        // }, 'csrf-token')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        origin: isProd ? 'https://youlink.com' : 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
