import { Injectable } from "@nestjs/common";

import { AuthSessionRepository } from "../infrastructure/persistence/prisma/session.repository";

@Injectable()
export class AuthLogoutService {
  constructor(private readonly repositorySession: AuthSessionRepository) { }

  async logout(userId: number, token: string) {
    console.log(userId, token);
    await this.repositorySession.update({
      userId,
      token,
    }, { disabled: true });

    const expiresIn = new Date();
    await this.repositorySession.updateMany({
      userId,
      expiresAt: {
        lt: expiresIn.toISOString(),
      },
    }, { disabled: true });
  }
}
