'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { StatCard } from '@/components/dashboard/stat-card'
import { analytics, vehicles, trips } from '@/lib/mock-data'
import { formatNumber, formatCurrency } from '@/lib/date-utils'
import {
  TrendingUp,
  Zap,
  IndianRupee,   // ✅ changed from DollarSign
  AlertTriangle,
  Truck,
} from 'lucide-react'

function AnalyticsContent() {
  const completionRate = (
    (analytics.completedTrips / analytics.totalTrips) *
    100
  ).toFixed(1)

  const avgUtilization = (
    vehicles.reduce((sum, v) => sum + v.utilization, 0) / vehicles.length
  ).toFixed(1)

  const avgHealth = (
    vehicles.reduce((sum, v) => sum + v.health, 0) / vehicles.length
  ).toFixed(1)

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive fleet performance insights and trends.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Trips"
          value={analytics.totalTrips}
          icon={<Truck className="w-5 h-5" />}
          color="blue"
          trend={8}
        />

        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="green"
          trend={5}
        />

        <StatCard
          title="Total Distance"
          value={`${(analytics.totalDistance / 1000).toFixed(1)}k`}
          unit="mi"
          icon={<Truck className="w-5 h-5" />}
          color="blue"
          trend={12}
        />

        {/* ✅ Revenue card fixed */}
        <StatCard
          title="Revenue"
          value={formatCurrency(analytics.revenue)}
          icon={<IndianRupee className="w-5 h-5" />}
          color="green"
          trend={15}
        />

        <StatCard
          title="Avg Efficiency"
          value={`${analytics.averageEfficiency.toFixed(1)}%`}
          icon={<Zap className="w-5 h-5" />}
          color="blue"
          trend={3}
        />

        <StatCard
          title="Safety Incidents"
          value={analytics.safetyIncidents}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="red"
          trend={-50}
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Fleet Metrics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Fleet Metrics
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Average Utilization</span>
              <span className="font-bold text-foreground">{avgUtilization}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full"
                style={{ width: `${avgUtilization}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="text-muted-foreground">Average Fleet Health</span>
              <span className="font-bold text-foreground">{avgHealth}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${avgHealth}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="text-muted-foreground">Active Vehicles</span>
              <span className="font-bold text-foreground">
                {vehicles.filter((v) => v.status === 'active').length}/{vehicles.length}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${(vehicles.filter((v) => v.status === 'active').length / vehicles.length) * 100}%`,
                }}
              />
            </div>

          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Cost Analysis
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
              <span className="text-foreground">Fuel Costs</span>
              <span className="font-bold text-orange-500">
                {formatCurrency(analytics.fuelCost)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
              <span className="text-foreground">Maintenance Costs</span>
              <span className="font-bold text-blue-500">
                {formatCurrency(analytics.maintenanceCost)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
              <span className="text-foreground">Total Costs</span>
              <span className="font-bold text-foreground">
                {formatCurrency(
                  analytics.fuelCost + analytics.maintenanceCost
                )}
              </span>
            </div>

            <div className="h-px bg-border my-3" />

            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
              <span className="text-foreground font-semibold">Net Revenue</span>
              <span className="font-bold text-green-500">
                {formatCurrency(
                  analytics.revenue -
                  analytics.fuelCost -
                  analytics.maintenanceCost
                )}
              </span>
            </div>

          </div>
        </div>

      </div>
    </MainLayout>
  )
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsContent />
    </ProtectedRoute>
  )
}