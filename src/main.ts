import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: '&',
    methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  const PORT = configService.getOrThrow<number>('PORT');

  await app.listen(PORT);
  Logger.verbose(`Server Running on http://localhost:${PORT}`, 'BOOTSTRAP');
}
void bootstrap();
