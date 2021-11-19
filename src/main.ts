import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationException } from './all-exceptions.filter';

import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, httpsOptions: {
      key: fs.readFileSync('./secrets/privkey.pem'),
      cert: fs.readFileSync('./secrets/cert.pem'),
      ca: fs.readFileSync('./secrets/chain.pem'),
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false,
    exceptionFactory: (errors) => {
      const messages = errors.map(e => ({
        error: `${e.property} has wrong value ${e.value}.`,
        detail: e.constraints
      }));

      return new ValidationException(messages);
    },
  }));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();