import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HTTPExceptionFilter } from './exceptions/filters/http.exception.filter';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOptions: CorsOptions = {
  origin: process.env.ALLOWED_CORS_ORIGINS.split(' '),
  credentials: true, // always pass the header
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalFilters(new HTTPExceptionFilter());
  await app.listen(8000);
}
bootstrap();
