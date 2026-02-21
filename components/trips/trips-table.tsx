'use client'

import { Trip, Driver, Vehicle } from '@/lib/mock-data'
import { StatusBadge } from '@/components/common/status-badge'
import { MapPin, Clock, Package, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface TripsTableProps {
  trips: Trip[]
  drivers: Driver[]
  vehicles: Vehicle[]
}

export function TripsTable({ trips, drivers, vehicles }: TripsTableProps) {
  const getDriver = (id: string) => drivers.find((d) => d.id === id)
  const getVehicle = (id: string) => vehicles.find((v) => v.id === id)

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-500'
    if (efficiency >= 85) return 'text-yellow-500'
    return 'text-orange-500'
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-accent/5">
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Route
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Vehicle / Driver
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Cargo
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Distance
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Efficiency
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => {
              const driver = getDriver(trip.driverId)
              const vehicle = getVehicle(trip.vehicleId)

              return (
                <tr
                  key={trip.id}
                  className="border-b border-border hover:bg-accent/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/trips/${trip.id}`}
                      className="hover:text-accent transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {trip.startLocation.address}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            to {trip.endLocation.address}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={trip.status} variant="trip" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-foreground">{vehicle?.name}</p>
                      <p className="text-xs text-muted-foreground">{driver?.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {trip.cargoWeight} lbs
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{trip.distance} mi</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {trip.estimatedDuration.toFixed(1)}h
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${getEfficiencyColor(trip.efficiency)}`}>
                      {trip.efficiency}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">
                        {trip.revenue}
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
