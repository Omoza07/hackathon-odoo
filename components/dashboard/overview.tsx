'use client'

import { StatCard } from './stat-card'
import { Analytics } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/date-utils'
import {
  Truck,
  Route,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Zap,
} from 'lucide-react'

interface OverviewProps {
  analytics: Analytics
}

export function DashboardOverview({ analytics }: OverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Active Vehicles"
        value={analytics.activeVehicles}
        icon={<Truck className="w-5 h-5" />}
        color="green"
        trend={8}
      />
      <StatCard
        title="Total Trips"
        value={analytics.totalTrips}
        icon={<Route className="w-5 h-5" />}
        color="blue"
        trend={12}
      />
      <StatCard
        title="Revenue This Month"
        value={formatCurrency(analytics.revenue)}
        icon={<DollarSign className="w-5 h-5" />}
        color="green"
        trend={15}
      />
      <StatCard
        title="Average Efficiency"
        value={`${analytics.averageEfficiency.toFixed(1)}%`}
        icon={<Zap className="w-5 h-5" />}
        color="blue"
        trend={5}
      />
      <StatCard
        title="Fuel Cost"
        value={formatCurrency(analytics.fuelCost)}
        icon={<TrendingUp className="w-5 h-5" />}
        color="orange"
        trend={-3}
      />
      <StatCard
        title="Safety Incidents"
        value={analytics.safetyIncidents}
        icon={<AlertTriangle className="w-5 h-5" />}
        color="red"
        trend={-50}
      />
    </div>
  )
}
