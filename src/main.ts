import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { useSwagger } from './plugins/swagger/useSwagger';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(graphqlUploadExpress({ maxFieldSize: 10 * 1024 * 1024 }));
  app.use(compression());
  await useSwagger(app);
  await app.listen(3000);
}
bootstrap();
