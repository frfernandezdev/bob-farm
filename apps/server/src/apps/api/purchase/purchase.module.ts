import { Module } from "@nestjs/common";

import { LoggerModule } from "@/src/contexts/shared/infrastructure/logger/logger.module";
import { RouterModule } from "@nestjs/core";
import { ApiPurchaseCreatePurchaseController } from "./controllers/create.controller";
import { PurchasesModule } from "@/src/contexts/purchase/purchase.module";
import { ApiPurchaseListPurchaseController } from "./controllers/list.controller";

@Module({
  imports: [
    LoggerModule,
    PurchasesModule,
    RouterModule.register([
      {
        path: "/purchases",
        module: ApiPurchasesModule,
      },
    ]),
  ],
  controllers: [
    ApiPurchaseCreatePurchaseController,
    ApiPurchaseListPurchaseController
  ],
})
export class ApiPurchasesModule { }
