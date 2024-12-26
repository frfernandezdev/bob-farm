import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";

import { LoggerModule } from "@/shared/infrastructure/logger/logger.module";
import { ApiAuthModule } from "./auth/auth.module";
import { ApiPurchasesModule } from "./purchase/purchase.module";
import { seconds, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        LOGGER_LEVEL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    ThrottlerModule.forRoot([
      {
        limit: 1000,
        ttl: seconds(60)
      }
    ]),
    ApiAuthModule,
    ApiPurchasesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class ApiModule { }

