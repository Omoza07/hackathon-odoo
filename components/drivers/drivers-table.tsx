'use client'

import { Driver } from '@/lib/mock-data'
import { StatusBadge } from '@/components/common/status-badge'
import { Star, AlertTriangle, Zap } from 'lucide-react'
import Link from 'next/link'

interface DriversTableProps {
  drivers: Driver[]
}

export function DriversTable({ drivers }: DriversTableProps) {
  const getSafetyColor = (score: number) => {
    if (score >= 95) return 'text-green-500'
    if (score >= 85) return 'text-yellow-500'
    return 'text-orange-500'
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-accent/5">
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Driver
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Safety Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Total Trips
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                Violations
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                This Month
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr
                key={driver.id}
                className="border-b border-border hover:bg-accent/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/drivers/${driver.id}`}
                    className="hover:text-accent transition-colors"
                  >
                    <div className="font-medium text-foreground">{driver.name}</div>
                    <div className="text-sm text-muted-foreground">{driver.email}</div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={driver.status} variant="driver" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.floor(driver.rating) }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                    <span className="text-sm font-medium text-foreground ml-1">
                      {driver.rating.toFixed(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`font-bold ${getSafetyColor(driver.safetyScore)}`}>
                      {driver.safetyScore}%
                    </div>
                    {driver.safetyScore < 85 && (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">
                    {driver.totalTrips}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {driver.violations > 0 && (
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-500 text-xs font-medium rounded">
                        {driver.violations}
                      </span>
                    )}
                    {driver.violations === 0 && (
                      <span className="text-green-500 text-sm font-medium">Clean</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {driver.tripsThisMonth} trips
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
