import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaClient } from "@/src/contexts/shared/infrastructure/persistence/prisma/prisma.client";

@Injectable()
export class AuthUserRepository {
  constructor(private readonly prisma: PrismaClient) { }

  findUnique(criteria: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where: criteria });
  }

  create(data: Pick<Prisma.UserCreateInput, "name" | "email" | "password">) {
    return this.prisma.user.create({ data });
  }
}
