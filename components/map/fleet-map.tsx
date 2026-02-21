'use client'

import { Vehicle } from '@/lib/mock-data'
import { formatNumber } from '@/lib/date-utils'
import { MapPin, Info } from 'lucide-react'
import { useState } from 'react'

interface FleetMapProps {
  vehicles: Vehicle[]
}

export function FleetMap({ vehicles }: FleetMapProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  // Normalize coordinates to grid (0-100)
  const normalizeCoord = (coord: number, isLat: boolean) => {
    const min = isLat ? 40.5 : -74.2
    const max = isLat ? 41.0 : -73.8
    return ((coord - min) / (max - min)) * 100
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'maintenance':
        return 'bg-orange-500'
      case 'idle':
        return 'bg-gray-500'
      default:
        return 'bg-blue-500'
    }
  }

  const selected = selectedVehicle
    ? vehicles.find((v) => v.id === selectedVehicle)
    : null

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Fleet Tracking Map</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="relative w-full aspect-square bg-background border-2 border-border rounded-lg overflow-hidden">
            {/* Grid Background */}
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              viewBox="0 0 100 100"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>

            {/* Vehicles Markers */}
            {vehicles.map((vehicle) => {
              const x = normalizeCoord(vehicle.location.lng, false)
              const y = normalizeCoord(vehicle.location.lat, true)
              const isSelected = selectedVehicle === vehicle.id

              return (
                <button
                  key={vehicle.id}
                  onClick={() =>
                    setSelectedVehicle(isSelected ? null : vehicle.id)
                  }
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  title={vehicle.name}
                >
                  {/* Pulse Ring */}
                  {vehicle.status === 'active' && (
                    <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 animate-pulse opacity-20" />
                  )}

                  {/* Marker */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${getStatusColor(vehicle.status)} border-white flex items-center justify-center transition-all ${
                      isSelected
                        ? 'ring-2 ring-accent scale-125'
                        : 'group-hover:scale-110'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-white" />
                  </div>

                  {/* Label */}
                  <div className="absolute top-full mt-1 whitespace-nowrap px-2 py-1 bg-card border border-border rounded text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {vehicle.name}
                  </div>
                </button>
              )
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-muted-foreground">Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500" />
                <span className="text-muted-foreground">Idle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Details Sidebar */}
        <div className="bg-accent/5 border border-border rounded-lg p-4 flex flex-col">
          <h3 className="font-semibold text-foreground mb-4">Vehicle Details</h3>

          {selected ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Vehicle Name</p>
                <p className="font-medium text-foreground">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">License Plate</p>
                <p className="font-medium text-foreground">{selected.licensePlate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    selected.status === 'active'
                      ? 'bg-green-500/20 text-green-500'
                      : selected.status === 'maintenance'
                        ? 'bg-orange-500/20 text-orange-500'
                        : 'bg-gray-500/20 text-gray-500'
                  }`}
                >
                  {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Fuel</p>
                  <p className="font-medium text-foreground">{selected.fuelLevel}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Mileage</p>
                  <p className="font-medium text-foreground">
                    {formatNumber(selected.mileage)} mi
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Utilization</p>
                  <p className="font-medium text-foreground">{selected.utilization}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Health</p>
                  <p
                    className={`font-medium ${
                      selected.health >= 90
                        ? 'text-green-500'
                        : selected.health >= 75
                          ? 'text-yellow-500'
                          : 'text-orange-500'
                    }`}
                  >
                    {selected.health}%
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <Info className="w-8 h-8 text-muted-foreground mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">
                Click on a vehicle marker to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
