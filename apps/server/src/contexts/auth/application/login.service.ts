import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { AuthSessionRepository } from "../infrastructure/persistence/prisma/session.repository";

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly configService: ConfigService,
    private readonly repositorySession: AuthSessionRepository,
    private readonly jwtService: JwtService,
  ) { }

  async login(user: any, ip: string) {
    const payload = { email: user.email, sub: user.id };
    const expiresIn = this.configService.get<number>("JWT_EXPIRES_IN") ?? 3600;
    const token = this.jwtService.sign(payload, { expiresIn: `${expiresIn}s` });
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + expiresIn);

    await this.repositorySession.create({
      user: {
        connect: {
          id: user.id,
        },
      },
      ip,
      token,
      expiresAt: expiredAt.toISOString(),
    });

    return {
      ...user,
      access_token: token,
    };
  }
}
