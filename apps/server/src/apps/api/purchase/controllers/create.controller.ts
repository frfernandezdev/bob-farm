import type { Request } from "express";

import { Body, Controller, HttpCode, Inject, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CreatePurchaseService } from "@/src/contexts/purchase/application/CreatePurchase.service";
import { PurchaseResponseDTO } from "../dtos/response.dto";
import { CreatePurchaseDTO } from "../dtos/create.dto";
import { JwtAuthGuard } from "@/src/contexts/auth/infrastructure/guards/jwt.guard";
import { seconds, Throttle } from "@nestjs/throttler";

@ApiTags("purchases")
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({
  path: '/',
  version: '1'
})
export class ApiPurchaseCreatePurchaseController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: CreatePurchaseService
  ) { }

  @Throttle({ default: { ttl: seconds(60), limit: 1 }})
  @Post()
  @HttpCode(200)
  async handle(@Req() req: Request, @Body() payload: CreatePurchaseDTO) {
    await this.service.create((req.user as any).id);
  }
}
