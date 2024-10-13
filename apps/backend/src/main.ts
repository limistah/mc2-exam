import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { env } from 'utils/envConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use(helmet());

  // API Doc
  const swaggerConfig = new DocumentBuilder()
    .setTitle('MC^2 Exam API Docs')
    .setDescription('API docs for MC^2 Exam')
    .setVersion('1.0')
    .addTag('MC^2')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(env.PORT || 3000);
}
bootstrap();
