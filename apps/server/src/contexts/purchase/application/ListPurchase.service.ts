import { Injectable } from "@nestjs/common";
import { PurchaseRepository } from "../infrastructure/persistence/prisma/purchase.repository";


@Injectable()
export class ListPurchaseService {
  constructor(
    private readonly repository: PurchaseRepository
  ) { }

  list(userId: number) {
    return this.repository.findMany({ user_id: userId });
  }
}
