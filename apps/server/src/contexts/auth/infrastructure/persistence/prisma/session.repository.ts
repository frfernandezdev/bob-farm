import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaClient } from "@/src/contexts/shared/infrastructure/persistence/prisma/prisma.client";

@Injectable()
export class AuthSessionRepository {
  constructor(private readonly prisma: PrismaClient) { }

  create(data: Prisma.SessionCreateInput) {
    return this.prisma.session.create({ data });
  }

  delete(where: Prisma.SessionWhereUniqueInput) {
    return this.prisma.session.delete({ where });
  }

  deleteMany(where: Prisma.SessionWhereInput) {
    return this.prisma.session.deleteMany({ where });
  }
}
