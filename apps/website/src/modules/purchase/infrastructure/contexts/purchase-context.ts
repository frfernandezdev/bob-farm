import { createContext, Dispatch, SetStateAction, useContext } from "react"

export interface PurchaseContextType {
  purchases: Purchase[];
  setPurchases: Dispatch<SetStateAction<Purchase[]>>;
  purchaseCorn: () => Promise<void>
  getPurchases: () => Promise<void>
}

export const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined)

export function usePurchase() {
  const context = useContext(PurchaseContext)
  if (context === undefined) {
    throw new Error('usePurchase must be used within an PurchaseProvider')
  }
  return context
}
