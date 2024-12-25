import type { Request } from "express";

import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Logger,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthUserService } from "@/src/contexts/auth/application/user.service";
import { JwtAuthGuard } from "@/src/contexts/auth/infrastructure/guards/jwt.guard";

import { AuthResponseDTO } from "../dtos/response.dto";

@ApiTags("auth")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller({ path: "/user", version: "1" })
export class ApiAuthUserController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: AuthUserService,
  ) { }

  @Get()
  @HttpCode(200)
  async handle(@Req() req: Request) {
    return AuthResponseDTO.make({
      result: await this.service.findById((req.user as any)?.id),
    });
  }
}
