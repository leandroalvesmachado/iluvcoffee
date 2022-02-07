import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // validation para toda a aplicação, de forma global
    new ValidationPipe({
      whitelist: true, // só aceita valores do DTO
      forbidNonWhitelisted: true, // se vier um valor fora do DTO, retorna error
      transform: true, // transformar os dados enviados nas instancias corretas do DTO,
      transformOptions: {
        // utilizado para não precisar informar o tipo com o @Type(() => Number) decorator, transformação ja feita de acordo com o tipo
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new ApiKeyGuard());
  await app.listen(3000);
}
bootstrap();
