'use client'

import { Vehicle, Driver } from '@/lib/mock-data'
import { Zap, Check } from 'lucide-react'
import { useState } from 'react'

interface DispatchAssistantProps {
  availableVehicles: Vehicle[]
  availableDrivers: Driver[]
}

export function DispatchAssistant({
  availableVehicles,
  availableDrivers,
}: DispatchAssistantProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null)
  const [autoAssigned, setAutoAssigned] = useState(false)

  const handleAutoAssign = () => {
    if (availableVehicles.length > 0 && availableDrivers.length > 0) {
      const bestVehicle = availableVehicles.reduce((best, current) =>
        current.utilization < best.utilization ? current : best
      )
      const bestDriver = availableDrivers.reduce((best, current) =>
        current.safetyScore > best.safetyScore ? current : best
      )

      setSelectedVehicle(bestVehicle.id)
      setSelectedDriver(bestDriver.id)
      setAutoAssigned(true)

      setTimeout(() => {
        setAutoAssigned(false)
        setSelectedVehicle(null)
        setSelectedDriver(null)
      }, 2000)
    }
  }

  return (
    <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Smart Dispatch</h2>
          <p className="text-sm text-muted-foreground">
            Auto-assign trips based on efficiency metrics
          </p>
        </div>
        <button
          onClick={handleAutoAssign}
          disabled={autoAssigned}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium disabled:opacity-50"
        >
          {autoAssigned ? (
            <>
              <Check className="w-5 h-5" />
              Assigned!
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Auto Assign
            </>
          )}
        </button>
      </div>

      {/* Assignment Preview */}
      {selectedVehicle && selectedDriver && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Assigned Vehicle</p>
            <p className="font-semibold text-green-500">
              {availableVehicles.find((v) => v.id === selectedVehicle)?.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Utilization:{' '}
              {availableVehicles.find((v) => v.id === selectedVehicle)?.utilization}%
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Assigned Driver</p>
            <p className="font-semibold text-green-500">
              {availableDrivers.find((d) => d.id === selectedDriver)?.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Safety Score:{' '}
              {availableDrivers.find((d) => d.id === selectedDriver)?.safetyScore}%
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-background rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Available Vehicles</p>
          <p className="text-2xl font-bold text-foreground">{availableVehicles.length}</p>
        </div>
        <div className="p-4 bg-background rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Available Drivers</p>
          <p className="text-2xl font-bold text-foreground">{availableDrivers.length}</p>
        </div>
      </div>
    </div>
  )
}
