import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Swagger Links-to-experts')
    .setDescription('testing API address')
    .setVersion('1.0')
    .addTag('links')
    .addBearerAuth()
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
  await app.listen(3000);

}
bootstrap()