import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { AuthModule } from "@/src/contexts/auth/auth.module";

import { ApiAuthLoginController } from "./controllers/login.controller";
import { ApiAuthLogoutController } from "./controllers/logout.controller";
import { ApiAuthRegisterController } from "./controllers/register.controller";
import { ApiAuthUserController } from "./controllers/user.controller";
import { LoggerModule } from "@/src/contexts/shared/infrastructure/logger/logger.module";

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    RouterModule.register([
      {
        path: "/auth", // Aquí defines el prefijo del módulo
        module: ApiAuthModule,
      },
    ]),
  ],
  controllers: [
    ApiAuthLoginController,
    ApiAuthLogoutController,
    ApiAuthRegisterController,
    ApiAuthUserController,
  ],
})
export class ApiAuthModule { }
