"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth-context"
import { checkAuth } from "@modules/core/application/check-auth";
import { login } from "@modules/core/application/login";
import { register } from "@modules/core/application/register";
import { logout } from "@modules/core/application/logout";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const _checkAuth = checkAuth(setUser)
  const _login = login(setUser, router);
  const _register = register(setUser, router);
  const _logout = logout(setUser, router);

  useEffect(() => {
    _checkAuth();
  }, [])

  return (
    <AuthContext.Provider value={{ user, checkAuth: _checkAuth, login: _login, register: _register, logout: _logout }}>
      {children}
    </AuthContext.Provider>
  )
}
