import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tochi — Estilismo & Producción de Moda',
  description: 'Portfolio de estilismo y producción de moda',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
