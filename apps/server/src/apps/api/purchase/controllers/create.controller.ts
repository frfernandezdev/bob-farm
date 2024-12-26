import type { Request } from "express";

import { Body, Controller, HttpCode, Inject, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { LocalAuthGuard } from "@/src/contexts/auth/infrastructure/guards/local.guard";
import { CreatePurchaseService } from "@/src/contexts/purchase/application/CreatePurchase.service";
import { PurchaseResponseDTO } from "../dtos/response.dto";
import { CreatePurchaseDTO } from "../dtos/create.dto";

@ApiTags("purchases")
@ApiBearerAuth('access-token')
@UseGuards(LocalAuthGuard)
@Controller({
  path: '/',
  version: '1'
})
export class ApiPurchaseCreatePurchaseController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: CreatePurchaseService
  ) { }

  @Post()
  @HttpCode(200)
  async handle(@Req() req: Request, @Body() payload: CreatePurchaseDTO) {
    await this.service.create((req.user as any).id);
    return PurchaseResponseDTO.make({
      result: {}
    })
  }
}
