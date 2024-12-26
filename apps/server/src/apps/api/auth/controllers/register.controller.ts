import type { Request } from "express";
import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Logger,
  Post,
  Req,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthRegisterService } from "@/src/contexts/auth/application/register.service";

import { RegisterDTO } from "../dtos/register.dto";
import { AuthResponseDTO } from "../dtos/response.dto";

@ApiTags("auth")
@ApiBearerAuth("access-token")
@Controller({
  path: "/register",
  version: "1",
})
export class ApiAuthRegisterController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: AuthRegisterService,
  ) { }

  @Post()
  @HttpCode(200)
  async handle(@Req() req: Request, @Body() payload: RegisterDTO) {
    return AuthResponseDTO.make({
      result: await this.service.register(payload, req.ip),
    });
  }
}
