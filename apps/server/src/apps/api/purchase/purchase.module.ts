import { Module } from "@nestjs/common";

import { LoggerModule } from "@/src/contexts/shared/infrastructure/logger/logger.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD, RouterModule } from "@nestjs/core";
import { ApiPurchaseCreatePurchaseController } from "./controllers/create.controller";
import { PurchasesModule } from "@/src/contexts/purchase/purchase.module";
import { CustomThrottlerGuard } from "@/src/contexts/purchase/infrastructure/guards/throttler.guards";

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
    ThrottlerModule.forRoot([
      {
        limit: 1,
        ttl: 60
      }
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard
    }
  ],
  controllers: [
    ApiPurchaseCreatePurchaseController
  ],
})
export class ApiPurchasesModule { }
