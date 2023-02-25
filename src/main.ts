import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();
  setupSwagger(app);
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);
}
bootstrap();
