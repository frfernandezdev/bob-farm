import { Injectable } from "@nestjs/common";
import { PurchaseRepository } from "../infrastructure/persistence/prisma/purchase.repository";


@Injectable()
export class CreatePurchaseService {
  constructor(
    private readonly repository: PurchaseRepository
  ) { }

  async create(userId: number) {
    await this.repository.create({
      user: {
        connect: {
          id: userId
        }
      }
    });
  }
}
