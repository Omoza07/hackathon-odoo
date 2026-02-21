'use client'

import { MaintenanceAlert, Vehicle } from '@/lib/mock-data'
import { StatusBadge } from '@/components/common/status-badge'
import { formatCurrency } from '@/lib/date-utils'
import { AlertTriangle, Clock, Wrench } from 'lucide-react'
import Link from 'next/link'

interface AlertsListProps {
  alerts: MaintenanceAlert[]
  vehicles: Vehicle[]
}

export function AlertsList({ alerts, vehicles }: AlertsListProps) {
  const getVehicle = (id: string) => vehicles.find((v) => v.id === id)

  const getSeverityIcon = (severity: string) => {
    return <AlertTriangle className="w-5 h-5" />
  }

  return (
    <div className="space-y-4">
      {alerts.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-lg bg-accent/5">
          <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
          <p className="text-muted-foreground">No maintenance alerts</p>
        </div>
      ) : (
        alerts.map((alert) => {
          const vehicle = getVehicle(alert.vehicleId)
          const daysUntilDue = Math.ceil(
            (new Date(alert.dueDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )

          return (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg transition-colors ${
                alert.severity === 'critical'
                  ? 'border-red-500/30 bg-red-500/5'
                  : alert.severity === 'high'
                    ? 'border-orange-500/30 bg-orange-500/5'
                    : 'border-border'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    alert.severity === 'critical'
                      ? 'bg-red-500/20 text-red-500'
                      : alert.severity === 'high'
                        ? 'bg-orange-500/20 text-orange-500'
                        : alert.severity === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-green-500/20 text-green-500'
                  }`}
                >
                  {getSeverityIcon(alert.severity)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {alert.description}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {vehicle?.name} ({vehicle?.licensePlate})
                      </p>
                    </div>
                    <StatusBadge status={alert.status} variant="maintenance" />
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {daysUntilDue > 0 ? (
                        <span className="text-muted-foreground">
                          Due in {daysUntilDue} days
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">Overdue</span>
                      )}
                    </div>

                    {alert.cost && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Estimated Cost:</span>
                        <span className="font-medium text-foreground">
                          {formatCurrency(alert.cost)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
