import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
//     logger: ['error', 'warn', 'log'],
//     logger: console,
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
