import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('The application should operate with the following resources: User, Artist, Track, Album, Favorites.')
    .setVersion('1.0')
    .addTag('restapi')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const port = app.get(ConfigService).get('PORT');

  await app.listen(port, () => console.log(`Server is running on port: ${port}`));
}
bootstrap();
