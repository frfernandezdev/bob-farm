import { Navbar } from "@modules/core/presentation/organisms/Navbar"
import { PurchaseProvider } from "@modules/purchase/infrastructure/providers/purchase-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 pt-16">
        <PurchaseProvider>
          {children}
        </PurchaseProvider>
      </main>
    </div>
  )
}
