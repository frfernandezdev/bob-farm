import { Module } from "@nestjs/common";

import { LoggerModule } from "@/src/contexts/shared/infrastructure/logger/logger.module";

@Module({
  imports: [LoggerModule],
  controllers: [
  ],
})
export class ApiPurchasesModule { }
