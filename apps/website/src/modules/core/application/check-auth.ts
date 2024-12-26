import { deleteCookie, getCookie } from "cookies-next/client";
import { Dispatch, SetStateAction } from "react";

export const checkAuth = (setUser: Dispatch<SetStateAction<User | null>>) => async () => {
  const token = getCookie('token');
  if (!token) return false


  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) {
      throw new Error('Token inválido')
    }

    const { result } = await res.json()
    const { name, email } = result;
    setUser({ name, email, token })
    return true
  } catch (error) {
    console.error('Error al verificar la autenticación:', error)
    deleteCookie('token');
    setUser(null)
    return false
  }
}
