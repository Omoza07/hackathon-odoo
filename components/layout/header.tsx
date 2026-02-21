'use client'

import { Bell, Settings, User, Search } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [notificationCount] = useState(3)

  return (
    <header className="fixed top-0 left-64 right-0 z-30 bg-background border-b border-border h-16 flex items-center justify-between px-8">
      {/* Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search vehicles, drivers, trips..."
          className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground text-sm"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-accent/10 rounded-lg transition-colors group">
          <Bell className="w-5 h-5 text-foreground" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
          <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg p-4 hidden group-hover:block">
            <p className="text-sm font-semibold mb-2">Notifications</p>
            <div className="space-y-2">
              <div className="p-2 bg-accent/10 rounded text-xs">
                Vehicle v003 requires maintenance
              </div>
              <div className="p-2 bg-accent/10 rounded text-xs">
                Trip t001 efficiency is below 85%
              </div>
              <div className="p-2 bg-accent/10 rounded text-xs">
                Driver d004 is available for dispatch
              </div>
            </div>
          </div>
        </button>

        {/* Settings */}
        <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-foreground" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-accent/10 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Admin</span>
        </button>
      </div>
    </header>
  )
}
