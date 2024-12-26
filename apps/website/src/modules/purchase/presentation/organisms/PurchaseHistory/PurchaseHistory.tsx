'use client'

import { usePurchase } from '@modules/purchase/infrastructure/contexts/purchase-context'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@modules/shared/infrastructure/shadcn/components/ui/table'
import { useToast } from '@modules/shared/infrastructure/shadcn/hooks/use-toast'
import { useEffect, useState } from 'react'

export function PurchaseHistory() {
  const [isLoading, setIsLoading] = useState(true)
  const { getPurchases, purchases } = usePurchase()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchPurchases() {
      try {
        await getPurchases()
      } catch (error) {
        console.error('Error fetching purchases:', error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las compras. Por favor, intenta de nuevo más tarde.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPurchases()
  }, [])

  if (isLoading) {
    return <div>Cargando historial de compras...</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{purchase.id}</TableCell>
              <TableCell>{new Date(purchase.purchase_time).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

