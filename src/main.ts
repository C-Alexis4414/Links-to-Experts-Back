import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CsrfExceptionFilter } from './csrf-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Swagger Links-to-experts')
    .setDescription('testing API address')
    .setVersion('1.0')
    .addTag('links')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'authorization'
    )
    .addCookieAuth('csrf-token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'X-CSRF-TOKEN',
      description: 'CSRF token for protection',
    })
    .addApiKey({
      type: 'apiKey',
      name: 'X-CSRF-TOKEN',
      in: 'header',
      description: 'CSRF protection token',
    }, 'csrf-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // const options = new DocumentBuilder().addSecurity('basic', {
  //   type: 'http',
  //   scheme: 'basic',
  // });

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Save global filter for csrf errors
  app.useGlobalFilters(new CsrfExceptionFilter());

  await app.listen(3000);

}
bootstrap()