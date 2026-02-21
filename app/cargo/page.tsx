'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { vehicles, trips } from '@/lib/mock-data'
import { formatNumber } from '@/lib/date-utils'
import { Package, Truck, BarChart3 } from 'lucide-react'

function CargoContent() {
  // Calculate cargo metrics
  const totalCapacity = vehicles.reduce((sum, v) => sum + v.capacity, 0)
  const currentUtilization = trips
    .filter((t) => t.status === 'in-progress' || t.status === 'scheduled')
    .reduce((sum, t) => sum + t.cargoWeight, 0)

  const utilizationPercent = (currentUtilization / totalCapacity) * 100

  const cargoByType = trips.reduce(
    (acc, trip) => {
      const existing = acc.find((c) => c.type === trip.cargoType)
      if (existing) {
        existing.weight += trip.cargoWeight
        existing.count += 1
      } else {
        acc.push({ type: trip.cargoType, weight: trip.cargoWeight, count: 1 })
      }
      return acc
    },
    [] as { type: string; weight: number; count: number }[]
  )

  const vehicleUtilization = vehicles.map((v) => ({
    name: v.name,
    capacity: v.capacity,
    utilization: v.utilization,
    cargoWeight: trips
      .filter(
        (t) =>
          t.vehicleId === v.id &&
          (t.status === 'in-progress' || t.status === 'scheduled')
      )
      .reduce((sum, t) => sum + t.cargoWeight, 0),
  }))

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Cargo Management</h1>
        <p className="text-muted-foreground">
          Monitor cargo capacity and utilization across your fleet.
        </p>
      </div>

      {/* Overall Utilization */}
      <div className="mb-8 bg-card border border-border rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Fleet Cargo Capacity
            </h2>
            <p className="text-muted-foreground">
              {formatNumber(Math.round(currentUtilization))} / {formatNumber(totalCapacity)} lbs in use
            </p>
          </div>
          <Package className="w-12 h-12 text-accent opacity-30" />
        </div>

        {/* Large Progress Bar */}
        <div className="space-y-4">
          <div className="w-full bg-border rounded-full h-12 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-blue-600 transition-all duration-500 flex items-center justify-end pr-4"
              style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
            >
              <span className="text-white font-bold text-lg">
                {utilizationPercent.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Empty</span>
            <span>50%</span>
            <span>Full</span>
          </div>
        </div>
      </div>

      {/* Cargo by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Cargo by Type
          </h2>
          <div className="space-y-3">
            {cargoByType.length === 0 ? (
              <p className="text-muted-foreground">No active cargo</p>
            ) : (
              cargoByType.map((cargo, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{cargo.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {cargo.count} shipment{cargo.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {formatNumber(cargo.weight)} lbs
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{
                        width: `${(cargo.weight / currentUtilization) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Avg Utilization</p>
            <p className="text-2xl font-bold text-foreground">
              {(
                vehicleUtilization.reduce((sum, v) => sum + v.utilization, 0) /
                vehicleUtilization.length
              ).toFixed(1)}
              %
            </p>
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Active Shipments</p>
            <p className="text-2xl font-bold text-foreground">
              {trips.filter((t) => t.status === 'in-progress' || t.status === 'scheduled').length}
            </p>
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Total Fleet Capacity</p>
            <p className="text-2xl font-bold text-foreground">
              {(totalCapacity / 1000).toFixed(1)}k lbs
            </p>
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Available Space</p>
            <p className="text-2xl font-bold text-foreground">
              {((totalCapacity - currentUtilization) / 1000).toFixed(1)}k lbs
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Utilization Details */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Vehicle Utilization
        </h2>
        <div className="space-y-4">
          {vehicleUtilization.map((vehicle, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">{vehicle.name}</p>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {vehicle.cargoWeight} / {vehicle.capacity} lbs
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    vehicle.utilization >= 90
                      ? 'bg-red-500'
                      : vehicle.utilization >= 75
                        ? 'bg-orange-500'
                        : vehicle.utilization >= 50
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                  }`}
                  style={{
                    width: `${(vehicle.cargoWeight / vehicle.capacity) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{((vehicle.cargoWeight / vehicle.capacity) * 100).toFixed(1)}% full</span>
                <span>{vehicle.utilization}% utilization</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default function CargoPage() {
  return (
    <ProtectedRoute>
      <CargoContent />
    </ProtectedRoute>
  )
}
