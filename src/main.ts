import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
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
  await app.listen(3000);
}
bootstrap();
