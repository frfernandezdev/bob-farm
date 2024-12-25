import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

import { AuthUserRepository } from "../infrastructure/persistence/prisma/user.repository";

@Injectable()
export class AuthValidateService {
  constructor(private readonly repository: AuthUserRepository) { }

  async validate(email: string, password: string) {
    const user = await this.repository.findUnique({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
