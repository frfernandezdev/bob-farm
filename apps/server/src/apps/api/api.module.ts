import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";

import { LoggerModule } from "@/shared/infrastructure/logger/logger.module";
import { ApiAuthModule } from "./auth/auth.module";

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        HEDERA_OPERATOR_ID: Joi.string().required(),
        HEDERA_OPERATOR_KEY: Joi.string().required(),
      }),
    }),
    ApiAuthModule
  ],
})
export class ApiModule { }
