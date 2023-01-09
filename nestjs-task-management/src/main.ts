import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log(process.env['NODE_CONFIG_DIR']);
  const serverconfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const options = new DocumentBuilder()
    .setTitle('Tasks Management')
    .setDescription('The tasks API description')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || serverconfig.port;
  await app.listen(port);
  logger.log(`Application is listening on port ${port}`);
}
bootstrap();
