'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { FleetMap } from '@/components/map/fleet-map'
import { vehicles } from '@/lib/mock-data'

function MapContent() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Fleet Tracking</h1>
        <p className="text-muted-foreground">
          Real-time location tracking for all active vehicles in your fleet.
        </p>
      </div>

      <FleetMap vehicles={vehicles} />
    </MainLayout>
  )
}

export default function MapPage() {
  return (
    <ProtectedRoute>
      <MapContent />
    </ProtectedRoute>
  )
}
