'use client'

import { usePurchase } from '@modules/purchase/infrastructure/contexts/purchase-context'
import { PurchaseHistory } from '@modules/purchase/presentation/organisms/PurchaseHistory'
import { Button } from '@modules/shared/infrastructure/shadcn/components/ui/button'
import { useToast } from '@modules/shared/infrastructure/shadcn/hooks/use-toast'
import { useState } from 'react'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { purchaseCorn } = usePurchase()
  const { toast } = useToast()

  const handlePurchaseCorn = async () => {
    try {
      setIsLoading(true);
      await purchaseCorn();
    }
    catch (error) {
      console.error('Error fetching purchases:', error)
      toast({
        title: "Solo puedes hacer una compra por minuto",
        description: "",
        variant: "destructive",
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Historial de Compras</h2>
        <Button disabled={isLoading} onClick={handlePurchaseCorn}>
          {isLoading ? "Cargando..." : "Comprar"}
        </Button>
      </div>
      <PurchaseHistory />
    </>
  )
}

