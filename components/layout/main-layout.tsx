'use client'

import { Sidebar } from './sidebar'
import { Header } from './header'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto pt-20 px-8 pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
