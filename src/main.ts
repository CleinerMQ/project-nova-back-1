import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const logger = new Logger('Main.ts');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Backend Project Nova API')
    .setDescription('Esta es la API del proyecto Nova')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  // Aplica el interceptor globalmente
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(envs.port);

  logger.log(`Swagger UI disponible en: http://localhost:${envs.port}/api/`);
}
bootstrap();
