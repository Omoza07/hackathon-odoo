'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { DashboardOverview } from '@/components/dashboard/overview'
import { RecentTrips } from '@/components/dashboard/recent-trips'
import { FleetHealth } from '@/components/dashboard/fleet-health'
import { vehicles, drivers, trips, analytics } from '@/lib/mock-data'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

function DashboardContent() {
  const activeAlerts = 3

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your fleet overview.
        </p>
      </div>

      {/* Alerts Banner */}
      {activeAlerts > 0 && (
        <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-500">
              {activeAlerts} Active Alerts
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Vehicle v003 requires maintenance, 1 low fuel alert, and 1 safety concern
            </p>
          </div>
        </div>
      )}

      {/* Overview Stats */}
      <DashboardOverview analytics={analytics} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trips */}
        <div className="lg:col-span-2">
          <RecentTrips trips={trips} drivers={drivers} vehicles={vehicles} />
        </div>

        {/* Fleet Health */}
        <div>
          <FleetHealth vehicles={vehicles} />
        </div>
      </div>
    </MainLayout>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
