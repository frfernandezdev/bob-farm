import { getCookie } from "cookies-next/client";
import { Dispatch, SetStateAction } from "react";
import { getPurchases } from "./get-purchases";

export const purchaseCorn = (setPurchases: Dispatch<SetStateAction<Purchase[]>>) => async () => {
  const token = getCookie('token')
  if (!token) {
    throw new Error('No estás autenticado')
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error('Error al realizar la compra')
    }

    getPurchases(setPurchases)();
  } catch (error) {
    console.error('Error durante la compra de maíz:', error)
    throw error
  }
}
