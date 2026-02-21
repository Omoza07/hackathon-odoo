'use client'

import { Trip, Driver, Vehicle } from '@/lib/mock-data'
import { StatusBadge } from '@/components/common/status-badge'
import { formatCurrency } from '@/lib/date-utils'
import { Truck, User, Clock, Package } from 'lucide-react'
import Link from 'next/link'

interface RecentTripsProps {
  trips: Trip[]
  drivers: Driver[]
  vehicles: Vehicle[]
}

export function RecentTrips({ trips, drivers, vehicles }: RecentTripsProps) {
  const getDriver = (id: string) => drivers.find((d) => d.id === id)
  const getVehicle = (id: string) => vehicles.find((v) => v.id === id)

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Trips</h2>
        <Link href="/trips" className="text-sm text-accent hover:text-accent/80">
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {trips.slice(0, 3).map((trip) => {
          const driver = getDriver(trip.driverId)
          const vehicle = getVehicle(trip.vehicleId)

          return (
            <div
              key={trip.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-foreground">
                    {trip.startLocation.address} → {trip.endLocation.address}
                  </h3>
                  <StatusBadge status={trip.status} variant="trip" />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    {vehicle?.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {driver?.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    {trip.cargoWeight} lbs
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {trip.estimatedDuration.toFixed(1)}h
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-500">
                  +{formatCurrency(trip.revenue)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {trip.efficiency}% efficient
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
