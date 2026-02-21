'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { TripsTable } from '@/components/trips/trips-table'
import { DispatchAssistant } from '@/components/trips/dispatch-assistant'
import { vehicles, drivers, trips } from '@/lib/mock-data'
import { Plus, Filter } from 'lucide-react'
import { useState } from 'react'

function TripsContent() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredTrips = statusFilter
    ? trips.filter((t) => t.status === statusFilter)
    : trips

  const activeVehicles = vehicles.filter((v) => v.status === 'active')
  const activeDrivers = drivers.filter((d) => d.status === 'active')

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Trips & Dispatch</h1>
        <p className="text-muted-foreground">
          Create, manage, and track shipments across your fleet.
        </p>
      </div>

      {/* Dispatch Assistant */}
      <div className="mb-6">
        <DispatchAssistant
          availableVehicles={activeVehicles}
          availableDrivers={activeDrivers}
        />
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
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredTrips.length} trips
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium">
          <Plus className="w-5 h-5" />
          Create Trip
        </button>
      </div>

      {/* Trips Table */}
      <TripsTable trips={filteredTrips} drivers={drivers} vehicles={vehicles} />
    </MainLayout>
  )
}

export default function TripsPage() {
  return (
    <ProtectedRoute>
      <TripsContent />
    </ProtectedRoute>
  )
}
