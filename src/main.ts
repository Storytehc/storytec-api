import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HTTPExceptionFilter } from './exceptions/filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HTTPExceptionFilter());
  await app.listen(8000);
}
bootstrap();
