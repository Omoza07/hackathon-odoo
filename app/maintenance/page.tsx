'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { AlertsList } from '@/components/maintenance/alerts-list'
import { StatCard } from '@/components/dashboard/stat-card'
import { vehicles, maintenanceAlerts, analytics } from '@/lib/mock-data'
import { AlertTriangle, CheckCircle, Clock, Wrench, Filter } from 'lucide-react'
import { useState } from 'react'

function MaintenanceContent() {
  const [severityFilter, setSeverityFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const criticalCount = maintenanceAlerts.filter(
    (a) => a.severity === 'critical'
  ).length
  const highCount = maintenanceAlerts.filter((a) => a.severity === 'high').length
  const pendingCount = maintenanceAlerts.filter(
    (a) => a.status === 'pending'
  ).length
  const completedCount = maintenanceAlerts.filter(
    (a) => a.status === 'completed'
  ).length

  const filteredAlerts = maintenanceAlerts.filter((alert) => {
    if (severityFilter && alert.severity !== severityFilter) return false
    if (statusFilter && alert.status !== statusFilter) return false
    return true
  })

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Maintenance Center
        </h1>
        <p className="text-muted-foreground">
          Track and manage vehicle maintenance schedules and repairs.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Critical Alerts"
          value={criticalCount}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="red"
        />
        <StatCard
          title="High Priority"
          value={highCount}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="orange"
        />
        <StatCard
          title="Pending Tasks"
          value={pendingCount}
          icon={<Clock className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Completed"
          value={completedCount}
          icon={<CheckCircle className="w-5 h-5" />}
          color="green"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <select
            value={severityFilter || ''}
            onChange={(e) => setSeverityFilter(e.target.value || null)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-accent"
          >
            <option value="">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <select
          value={statusFilter || ''}
          onChange={(e) => setStatusFilter(e.target.value || null)}
          className="px-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-accent"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="text-sm text-muted-foreground ml-auto">
          {filteredAlerts.length} alerts
        </div>
      </div>

      {/* Alerts List */}
      <AlertsList alerts={filteredAlerts} vehicles={vehicles} />
    </MainLayout>
  )
}

export default function MaintenancePage() {
  return (
    <ProtectedRoute>
      <MaintenanceContent />
    </ProtectedRoute>
  )
}
