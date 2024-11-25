import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);
  app.useLogger(loggingService);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription(
      'The application should operate with the following resources: User, Artist, Track, Album, Favorites.',
    )
    .setVersion('1.0')
    .addTag('restapi')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);
  const port = app.get(ConfigService).get('PORT');

  await app.listen(port, () =>
    console.log(`Server is running on port: ${port}`),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      loggingService.log(
        `${method} ${originalUrl} ${JSON.stringify(query)} ${JSON.stringify(
          body,
        )} - ${statusCode}`,
      );
    });
    next();
  });

  process.on('uncaughtException', (error) => {
    loggingService.error(`Uncaught Exception: ${error.message}`, error.stack);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.error(
      `Unhandled Rejection at: ${promise} reason: ${reason}`,
    );
  });
}
bootstrap();
