import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { INestApplication } from '@nestjs/common';


function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Untitled example')
    .setDescription('The untitled API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header'
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: '1',
      persistAuthorization: true
    }
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSwagger(app)

  await app.listen(3000);
}
void bootstrap();
