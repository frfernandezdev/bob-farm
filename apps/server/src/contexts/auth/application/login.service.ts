import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import timestring from 'timestring';

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
    const expiresIn = this.configService.get<string>("JWT_EXPIRES_IN") ?? '1h';
    const token = this.jwtService.sign(payload, { expiresIn });
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + timestring(expiresIn, 's'));

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
