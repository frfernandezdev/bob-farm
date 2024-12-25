import { Injectable } from "@nestjs/common";

import { AuthUserRepository } from "../infrastructure/persistence/prisma/user.repository";

@Injectable()
export class AuthUserService {
  constructor(private readonly repository: AuthUserRepository) { }

  findById(id: number) {
    return this.repository.findUnique({ id });
  }
}
