import type { Request } from "express";

import { Body, Controller, Get, HttpCode, Inject, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CreatePurchaseService } from "@/src/contexts/purchase/application/CreatePurchase.service";
import { PurchaseResponseDTO, PurchaseResponsePaginatorDTO } from "../dtos/response.dto";
import { CreatePurchaseDTO } from "../dtos/create.dto";
import { JwtAuthGuard } from "@/src/contexts/auth/infrastructure/guards/jwt.guard";
import { seconds, Throttle } from "@nestjs/throttler";
import { ListPurchaseService } from "@/src/contexts/purchase/application/ListPurchase.service";

@ApiTags("purchases")
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({
  path: '/',
  version: '1'
})
export class ApiPurchaseListPurchaseController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: ListPurchaseService
  ) { }

  @Get()
  @HttpCode(200)
  async handle(@Req() req: Request, @Body() payload: CreatePurchaseDTO) {
    return PurchaseResponsePaginatorDTO.make({
      results: await this.service.list((req.user as any).id)
    });
  }
}
