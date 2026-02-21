'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Map,
  Wrench,
  BarChart3,
  Package,
  LogOut,
  Settings,
  User,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Vehicles', href: '/vehicles', icon: Truck },
  { name: 'Drivers', href: '/drivers', icon: Users },
  { name: 'Trips', href: '/trips', icon: Route },
  { name: 'Map Tracking', href: '/map', icon: Map },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Cargo', href: '/cargo', icon: Package },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border hover:bg-sidebar-accent/5 transition">
        <img
          src="/fleetflow-logo.png"
          alt="FleetFlow"
          className="w-10 h-10"
        />
        <div>
          <h1 className="text-sm font-bold text-sidebar-foreground">FleetFlow</h1>
          <p className="text-xs text-muted-foreground">Fleet Management</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/10 font-medium transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.role || 'Guest'}</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
              <Link
                href="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-accent/10 transition text-sm"
              >
                <User className="w-4 h-4" />
                View Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-accent/10 transition text-sm"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <div className="h-px bg-border my-2" />
              <button
                onClick={() => {
                  setShowProfileMenu(false)
                  handleLogout()
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-500/10 transition text-sm text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
