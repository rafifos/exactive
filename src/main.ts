import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const applicationPort = 3000;

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  await app.listen(applicationPort);
  logger.log(`Application listening on port ${applicationPort}`);
}
bootstrap();
