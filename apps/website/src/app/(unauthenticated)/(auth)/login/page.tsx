'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@modules/shared/infrastructure/shadcn/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@modules/shared/infrastructure/shadcn/components/ui/card'
import { Input } from '@modules/shared/infrastructure/shadcn/components/ui/input'
import { useToast } from '@modules/shared/infrastructure/shadcn/hooks/use-toast'
import { useAuth } from '@modules/core/infrastructure/contexts/auth-context'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password)
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a la plataforma de comercio de maíz.",
      })
    } catch (error) {
      console.error('Login failed', error)
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor, verifica tus credenciales e intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa a tu cuenta para comprar maíz</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="password"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 justify-between">
          <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="w-full">
            {isLoading ? "Cargando..." : "Ingresar"}
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/register">Registrarse</Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
