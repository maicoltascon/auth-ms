import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', '*'), // Configura el origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('MICROSERVICE_HOST', '127.0.0.1'),
      port: configService.get<number>('MICROSERVICE_PORT', 3011),
    }
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
