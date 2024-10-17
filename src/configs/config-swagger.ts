import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (app: NestExpressApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Loyalty System')
    .setDescription('This is the API documentation!')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('stores')
    .addTag('ranks')
    .addTag('redemptions')
    .addTag('rewards')
    .addBearerAuth()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
