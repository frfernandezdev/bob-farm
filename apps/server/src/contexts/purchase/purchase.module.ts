import { Module } from "@nestjs/common";
import { PrismaModule } from "../shared/infrastructure/persistence/prisma/prisma.module";
import { PurchaseRepository } from "./infrastructure/persistence/prisma/purchase.repository";
import { CreatePurchaseService } from "./application/CreatePurchase.service";
import { ListPurchaseService } from "./application/ListPurchase.service";

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [PurchaseRepository, CreatePurchaseService, ListPurchaseService],
  exports: [CreatePurchaseService, ListPurchaseService]
})
export class PurchasesModule { }
