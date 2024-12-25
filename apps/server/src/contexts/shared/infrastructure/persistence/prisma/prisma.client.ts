import { Injectable, OnModuleInit } from "@nestjs/common";
import Prisma from "@prisma/client";

@Injectable()
export class PrismaClient extends Prisma.PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
