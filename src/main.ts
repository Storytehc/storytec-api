import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HTTPExceptionFilter } from './exceptions/filters/http.exception.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string | string[]>('ALLOWED_CORS_ORIGINS'),
    credentials: true
  });
  app.use(json({ limit: '5mb' }));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HTTPExceptionFilter());
  await app.listen(8000);
}
bootstrap();
