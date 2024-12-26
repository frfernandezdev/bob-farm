import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ScheduleModule } from "@nestjs/schedule";

import { PrismaModule } from "../shared/infrastructure/persistence/prisma/prisma.module";
import { AuthLoginService } from "./application/login.service";
import { AuthLogoutService } from "./application/logout.service";
import { AuthRegisterService } from "./application/register.service";
import { AuthUserService } from "./application/user.service";
import { AuthValidateService } from "./application/validate.service";
import { ExpireTokenCron } from "./infrastructure/crons/expire-token.cron";
import { AuthSessionRepository } from "./infrastructure/persistence/prisma/session.repository";
import { AuthUserRepository } from "./infrastructure/persistence/prisma/user.repository";
import { JwtStrategy } from "./infrastructure/strategies/jwt.strategy";
import { LocalStrategy } from "./infrastructure/strategies/local.strategy";
import { AuthSessionService } from "./application/session.service";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule aquí
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: `${configService.get<string>("JWT_EXPIRES_IN")}s`,
        },
      }),
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthUserRepository,
    AuthSessionRepository,
    AuthLoginService,
    AuthLogoutService,
    AuthRegisterService,
    AuthLogoutService,
    AuthValidateService,
    AuthUserService,
    AuthSessionService,
    ExpireTokenCron,
  ],
  exports: [
    AuthLoginService,
    AuthLogoutService,
    AuthRegisterService,
    AuthLogoutService,
    AuthValidateService,
    AuthUserService,
    AuthSessionService
  ],
})
export class AuthModule { }
