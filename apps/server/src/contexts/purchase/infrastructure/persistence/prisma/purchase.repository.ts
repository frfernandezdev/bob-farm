import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaClient } from "@/src/contexts/shared/infrastructure/persistence/prisma/prisma.client";

@Injectable()
export class PurchaseRepository {
  constructor(private readonly prisma: PrismaClient) { }
  
  findMany(criteria: Prisma.PurchasesWhereInput) {
    return this.prisma.purchases.findMany({ where: criteria });
  }

  findUnique(criteria: Prisma.PurchasesWhereUniqueInput) {
    return this.prisma.purchases.findUnique({ where: criteria });
  }

  create(data: Prisma.PurchasesCreateInput) {
    return this.prisma.purchases.create({ data });
  }
}
