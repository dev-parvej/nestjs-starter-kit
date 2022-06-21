import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { loggerOptions } from './config/loggerOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerOptions),
  });


  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Exam App')
    .setDescription('Exam app swagger documentation')
    .setVersion('1.0')
    .addTag('Exam')
    .build();
  
    app.enableCors();
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);
  
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

  await app.listen(3000);
  Logger.log('Server running on http://localhost:3000');
}
bootstrap();
