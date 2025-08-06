import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Prefijo global para API REST
  app.setGlobalPrefix('api');

  // Configuración de CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', '*'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });

  // Swagger/OpenAPI Configuración
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentación API')
    .setDescription('Documentación automática de la API con Swagger y NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document); // http://localhost:PORT/api-docs

  // Microservicio TCP
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('MICROSERVICE_HOST', '127.0.0.1'),
      port: configService.get<number>('MICROSERVICE_PORT', 3011),
    },
  });

  // Inicializa microservicio y servidor HTTP
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3010);

  console.log(`Servidor REST: ${await app.getUrl()}`);
  console.log(`Swagger docs: ${await app.getUrl()}/api-docs`);
}
bootstrap();
