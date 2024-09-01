import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //it throws an error if the property is not availablein dto
      whitelist: true,
      forbidNonWhitelisted: true,
      // it transforms the object of type dto
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
