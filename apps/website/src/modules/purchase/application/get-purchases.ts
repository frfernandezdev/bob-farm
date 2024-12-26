import { getCookie } from "cookies-next/client"
import { Dispatch, SetStateAction } from "react"

export const getPurchases = (setPurchases: Dispatch<SetStateAction<Purchase[]>>) => async (): Promise<void> => {
  const token = getCookie('token')
  if (!token) {
    throw new Error('No estás autenticado')
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener las compras')
    }

    const { results } = await response.json()
    setPurchases(results);
  } catch (error) {
    console.error('Error al obtener las compras:', error)
    throw error
  }
}
