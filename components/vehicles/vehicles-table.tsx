'use client'

import { Vehicle } from '@/lib/mock-data'
import { StatusBadge } from '@/components/common/status-badge'
import { formatDate, formatNumber } from '@/lib/date-utils'
import { Fuel, Wrench, Navigation2 } from 'lucide-react'
import Link from 'next/link'

interface VehiclesTableProps {
  vehicles: Vehicle[]
}

export function VehiclesTable({ vehicles }: VehiclesTableProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-accent/5">
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Vehicle
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Fuel
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Utilization
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Health
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Mileage
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Next Service
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-b border-border hover:bg-accent/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/vehicles/${vehicle.id}`}
                    className="hover:text-accent transition-colors"
                  >
                    <div className="font-medium text-foreground">{vehicle.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {vehicle.licensePlate}
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={vehicle.status} variant="vehicle" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {vehicle.fuelLevel}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-600"
                        style={{ width: `${vehicle.utilization}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-8">
                      {vehicle.utilization}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        vehicle.health >= 90
                          ? 'bg-green-500'
                          : vehicle.health >= 75
                            ? 'bg-yellow-500'
                            : vehicle.health >= 60
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                      }`}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {vehicle.health}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {formatNumber(vehicle.mileage)} mi
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(vehicle.nextMaintenanceDate)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
