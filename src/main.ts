import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ResponseSanitizerInterceptor } from './common/interceptors/responseSanitizer.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    app.use((req, res, next) => {
        console.log(`Incoming request: ${req.method} ${req.url}`);
        next();
    });

    app.useGlobalInterceptors(new ResponseSanitizerInterceptor());

    const config = new DocumentBuilder()
        .setTitle('Swagger Links-to-experts')
        .setDescription('testing API address')
        .setVersion('1.0')
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
        origin: 'http://localhost:5173',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
