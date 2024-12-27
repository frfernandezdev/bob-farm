import { setCookie } from "cookies-next/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

console.log(process.env);

export const login = (setUser: Dispatch<SetStateAction<User | null>>, router: AppRouterInstance) => async (email: string, password: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Credenciales inválidas')
    }

    const { result } = await response.json()
    const { access_token, name } = result
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
    console.error('Error durante el inicio de sesión:', error)
    throw error
  }
}
