import { deleteCookie, getCookie } from "cookies-next/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const logout = (setUser: Dispatch<SetStateAction<User | null>>, router: AppRouterInstance) => async () => {
  const token = getCookie('token');

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    setUser(null)
    deleteCookie('token');
    router.push('/login')
  } catch (error) {
    console.error('Error durante el logout de sesión:', error)
    throw error
  }
}
