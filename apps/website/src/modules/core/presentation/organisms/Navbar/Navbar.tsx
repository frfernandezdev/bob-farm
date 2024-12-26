'use client'

import { useAuth } from '@modules/core/infrastructure/contexts/auth-context';
import { Button } from '@modules/shared/infrastructure/shadcn/components/ui/button';
import { UserCircle } from 'lucide-react'

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">Bob Farm</div>
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="h-6 w-6" />
              <span>{user.name}</span>
            </div>
            <Button variant="secondary" size="sm" onClick={logout}>Cerrar sesión</Button>
          </div>
        )}
      </div>
    </nav>
  )
}
