'use client'

import { useAuth } from '@modules/core/infrastructure/contexts/auth-context'
import { Button } from '@modules/shared/infrastructure/shadcn/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@modules/shared/infrastructure/shadcn/components/ui/card'
import { Input } from '@modules/shared/infrastructure/shadcn/components/ui/input'
import { useToast } from '@modules/shared/infrastructure/shadcn/hooks/use-toast'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await register(name, email, password)
      toast({
        title: "Registro exitoso",
        description: "Bienvenido a la plataforma de comercio de maíz.",
      })
    } catch (error) {
      console.error('Registration failed', error)
      toast({
        title: "Error en el registro",
        description: "Por favor, verifica tus datos e intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Registrarse</CardTitle>
        <CardDescription>Crea una cuenta para comprar maíz</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-4">
        <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? "Cargando..." : "Registrarse"}
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
