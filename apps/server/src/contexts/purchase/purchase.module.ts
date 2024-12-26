import { Module } from "@nestjs/common";
import { PrismaModule } from "../shared/infrastructure/persistence/prisma/prisma.module";
import { PurchaseRepository } from "./infrastructure/persistence/prisma/purchase.repository";
import { CreatePurchaseService } from "./application/CreatePurchase.service";

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [PurchaseRepository, CreatePurchaseService],
  exports: [CreatePurchaseService]
})
export class PurchasesModule { }
