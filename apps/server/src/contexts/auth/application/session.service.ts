import { Injectable } from "@nestjs/common";
import { AuthSessionRepository } from "../infrastructure/persistence/prisma/session.repository";

@Injectable()
export class AuthSessionService {
  constructor(private readonly repository: AuthSessionRepository) { }

  findByToken(token: string) {
    return this.repository.findUnique({ token, disabled: false });
  }
}
