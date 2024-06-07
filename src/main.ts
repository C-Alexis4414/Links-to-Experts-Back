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
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // const options = new DocumentBuilder().addSecurity('basic', {
  //   type: 'http',
  //   scheme: 'basic',
  // });

  app.enableCors();
  await app.listen(3000);
}
bootstrap()