import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'   
import { AuthProvider } from '@/lib/auth-context'
import 'leaflet/dist/leaflet.css'
import '../styles/globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'FleetFlow | Fleet Management Dashboard',
  description:
    'Enterprise fleet management platform for real-time vehicle tracking, driver management, and logistics optimization',
  icons: {
    icon: '/fleetflow-logo.png',
    shortcut: '/fleetflow-logo.png',
    apple: '/fleetflow-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}