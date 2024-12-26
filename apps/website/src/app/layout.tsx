import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { AuthProvider } from '@modules/core/infrastructure/providers/auth-provider'
import { Toaster } from '@modules/shared/infrastructure/shadcn/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plataforma de Comercio de Maíz',
  description: 'Compra y vende maíz fácilmente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

