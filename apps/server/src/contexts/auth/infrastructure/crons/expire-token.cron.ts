import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { AuthSessionRepository } from "../persistence/prisma/session.repository";

@Injectable()
export class ExpireTokenCron {
  private readonly logger = new Logger(ExpireTokenCron.name);

  constructor(private readonly repository: AuthSessionRepository) { }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const expiresIn = new Date();
    this.logger.debug("Called every 60 seconds" + expiresIn);
    await this.repository.deleteMany({
      expiresAt: {
        lt: expiresIn,
      },
    });
  }
}
