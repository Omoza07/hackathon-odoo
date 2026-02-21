'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { VehiclesTable } from '@/components/vehicles/vehicles-table'
import { vehicles } from '@/lib/mock-data'
import { Plus, Filter } from 'lucide-react'
import { useState } from 'react'

function VehiclesContent() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredVehicles = statusFilter
    ? vehicles.filter((v) => v.status === statusFilter)
    : vehicles

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Fleet Vehicles</h1>
        <p className="text-muted-foreground">
          Manage and monitor your entire fleet of vehicles.
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
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="idle">Idle</option>
            </select>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredVehicles.length} vehicles
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium">
          <Plus className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      {/* Vehicles Table */}
      <VehiclesTable vehicles={filteredVehicles} />
    </MainLayout>
  )
}

export default function VehiclesPage() {
  return (
    <ProtectedRoute>
      <VehiclesContent />
    </ProtectedRoute>
  )
}
