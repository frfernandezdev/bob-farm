import { Injectable } from "@nestjs/common";

import { AuthSessionRepository } from "../infrastructure/persistence/prisma/session.repository";

@Injectable()
export class AuthLogoutService {
  constructor(private readonly repositorySession: AuthSessionRepository) { }

  async logout(userId: number, token: string) {
    await this.repositorySession.delete({
      userId,
      token,
    });
    const expiresIn = new Date();
    await this.repositorySession.deleteMany({
      userId,
      expiresAt: {
        lt: expiresIn.toISOString(),
      },
    });
  }
}
