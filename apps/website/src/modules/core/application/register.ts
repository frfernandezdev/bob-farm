import { setCookie } from "cookies-next/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const register = (setUser: Dispatch<SetStateAction<User | null>>, router: AppRouterInstance) => async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      throw new Error('Error en el registro')
    }

    const { result } = await response.json()
    const { access_token } = result
    setUser({ name, email, token: access_token })
    setCookie('token', access_token, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hora
      path: '/',
      sameSite: 'strict',
    })
    router.push('/purchase')
  } catch (error) {
    console.error('Error durante el registro:', error)
    throw error
  }
}
