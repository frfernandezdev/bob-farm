/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ClassSerializerInterceptor, Logger, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from "@fastify/helmet";
import { ApiModule } from './apps/api/api.module';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(ApiModule, new FastifyAdapter({
    trustProxy: true,
    logger: {
      level: "info", // Change this to 'debug' for more detailed logs
      transport: {
        target: "pino-pretty", // Use pino-pretty for pretty logging
        options: {
          colorize: true, // Colorize output for better visibility
          translateTime: "SYS:standard", // Display timestamps in standard format
          ignore: "pid,hostname", // Ignore pid and hostname in the output
        },
      },
    },
  }));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: '*'
  });

  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");

  const config = new DocumentBuilder()
    .setTitle("Bob's Farm")
    .setDescription("Backend for Bob's Farm")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "To authenticate you must previously be logged",
      },
      "access-token",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: "excludeAll",
      excludeExtraneousValues: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.register(helmet, {
    referrerPolicy: { policy: "no-referrer" },
    frameguard: { action: "deny" },
    permittedCrossDomainPolicies: true,
  });

  await app.listen(port);

  const logger = app.get(Logger);
  logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
}

process.on("uncaughtException", handleError);
