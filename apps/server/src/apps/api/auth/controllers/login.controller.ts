import type { Request } from "express";

import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Logger,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthLoginService } from "@/src/contexts/auth/application/login.service";
import { LocalAuthGuard } from "@/src/contexts/auth/infrastructure/guards/local.guard";

import { LoginDTO } from "../dtos/login.dto";
import { AuthResponseDTO } from "../dtos/response.dto";

@ApiTags("auth")
@ApiBearerAuth("access-token")
@UseGuards(LocalAuthGuard)
@Controller({
  path: "/login",
  version: "1",
})
export class ApiAuthLoginController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: AuthLoginService,
  ) { }

  @Post()
  @HttpCode(200)
  async handle(@Req() req: Request, @Body() payload: LoginDTO) {
    payload;
    return AuthResponseDTO.make({
      result: await this.service.login(req.user, req.ip),
    });
  }
}
