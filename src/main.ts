import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform query and body to DTO instances
      whitelist: true, // Strip out unwanted properties
      forbidNonWhitelisted: true, // Throw errors for unexpected properties
    }),
  );
  await app.listen(3000);
}
bootstrap();
