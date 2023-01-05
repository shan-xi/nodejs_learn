import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverconfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  const port = process.env.PORT || serverconfig.port;
  await app.listen(port);
  logger.log(`Application is listening on port ${port}`);
}
bootstrap();
