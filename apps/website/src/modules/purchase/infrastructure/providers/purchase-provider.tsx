"use client";

import { useState } from "react";
import { PurchaseContext } from "../contexts/purchase-context"
import { getPurchases } from "@modules/purchase/application/get-purchases";
import { purchaseCorn } from "@modules/purchase/application/purchase-corn";

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const _getPurchases = getPurchases(setPurchases);
  const _purchaseCorn = purchaseCorn(setPurchases);

  return (
    <PurchaseContext.Provider value={{ purchases, setPurchases, purchaseCorn: _purchaseCorn, getPurchases: _getPurchases }}>
      {children}
    </PurchaseContext.Provider>
  )
}
