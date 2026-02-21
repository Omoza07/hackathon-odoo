'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { DriversTable } from '@/components/drivers/drivers-table'
import { SafetyLeaderboard } from '@/components/drivers/safety-leaderboard'
import { drivers } from '@/lib/mock-data'
import { Plus, Filter } from 'lucide-react'
import { useState } from 'react'

function DriversContent() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredDrivers = statusFilter
    ? drivers.filter((d) => d.status === statusFilter)
    : drivers

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Fleet Drivers</h1>
        <p className="text-muted-foreground">
          Manage drivers, track safety scores, and view performance metrics.
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={statusFilter || ''}
              onChange={(e) => setStatusFilter(e.target.value || null)}
              className="px-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-accent"
            >
              <option value="">All Status</option>
              <option value="active">On Duty</option>
              <option value="on-break">On Break</option>
              <option value="off-duty">Off Duty</option>
            </select>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredDrivers.length} drivers
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium">
          <Plus className="w-5 h-5" />
          Add Driver
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Safety Leaderboard */}
        <div>
          <SafetyLeaderboard drivers={drivers} />
        </div>
      </div>

      {/* Drivers Table */}
      <DriversTable drivers={filteredDrivers} />
    </MainLayout>
  )
}

export default function DriversPage() {
  return (
    <ProtectedRoute>
      <DriversContent />
    </ProtectedRoute>
  )
}
