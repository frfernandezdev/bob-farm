import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaClient } from "@/src/contexts/shared/infrastructure/persistence/prisma/prisma.client";

@Injectable()
export class AuthSessionRepository {
  constructor(private readonly prisma: PrismaClient) { }

  findUnique(criteria: Prisma.SessionWhereUniqueInput) {
    return this.prisma.session.findUnique({ where: criteria });
  }

  findFirst(criteria: Prisma.SessionWhereInput) {
    return this.prisma.session.findFirst({ where: criteria });
  }

  count(criteria: Prisma.SessionWhereInput) {
    return this.prisma.session.count({ where: criteria });
  }

  create(data: Prisma.SessionCreateInput) {
    return this.prisma.session.create({ data });
  }

  update(criteria: Prisma.SessionWhereUniqueInput, data: Prisma.SessionUpdateInput) {
    return this.prisma.session.update({ where: criteria, data });
  }

  updateMany(criteria: Prisma.SessionWhereInput, data: Prisma.SessionUpdateInput) {
    return this.prisma.session.updateMany({ where: criteria, data });
  }

  delete(where: Prisma.SessionWhereUniqueInput) {
    return this.prisma.session.delete({ where });
  }

  deleteMany(where: Prisma.SessionWhereInput) {
    return this.prisma.session.deleteMany({ where });
  }
}
