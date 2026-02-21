import {
  vehicles,
  drivers,
  trips,
  maintenanceAlerts,
  analytics,
  Vehicle,
  Driver,
  Trip,
  MaintenanceAlert,
  Analytics,
} from './mock-data'

export async function getVehicles(
  filters?: { status?: string; type?: string }
): Promise<Vehicle[]> {
  let result = [...vehicles]
  if (filters?.status) {
    result = result.filter((v) => v.status === filters.status)
  }
  if (filters?.type) {
    result = result.filter((v) => v.type === filters.type)
  }
  return result
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  return vehicles.find((v) => v.id === id)
}

export async function getDrivers(
  filters?: { status?: string }
): Promise<Driver[]> {
  let result = [...drivers]
  if (filters?.status) {
    result = result.filter((d) => d.status === filters.status)
  }
  return result
}

export async function getDriverById(id: string): Promise<Driver | undefined> {
  return drivers.find((d) => d.id === id)
}

export async function getTrips(
  filters?: { status?: string; vehicleId?: string; driverId?: string }
): Promise<Trip[]> {
  let result = [...trips]
  if (filters?.status) {
    result = result.filter((t) => t.status === filters.status)
  }
  if (filters?.vehicleId) {
    result = result.filter((t) => t.vehicleId === filters.vehicleId)
  }
  if (filters?.driverId) {
    result = result.filter((t) => t.driverId === filters.driverId)
  }
  return result
}

export async function getTripById(id: string): Promise<Trip | undefined> {
  return trips.find((t) => t.id === id)
}

export async function getMaintenanceAlerts(
  filters?: { vehicleId?: string; severity?: string; status?: string }
): Promise<MaintenanceAlert[]> {
  let result = [...maintenanceAlerts]
  if (filters?.vehicleId) {
    result = result.filter((m) => m.vehicleId === filters.vehicleId)
  }
  if (filters?.severity) {
    result = result.filter((m) => m.severity === filters.severity)
  }
  if (filters?.status) {
    result = result.filter((m) => m.status === filters.status)
  }
  return result
}

export async function getAnalytics(): Promise<Analytics> {
  return analytics
}

export function getVehicleStatus(status: string) {
  const statusConfig = {
    active: { color: '#22c55e', label: 'Active' },
    maintenance: { color: '#f59e0b', label: 'Maintenance' },
    idle: { color: '#6b7280', label: 'Idle' },
  }
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.idle
}

export function getDriverStatus(status: string) {
  const statusConfig = {
    active: { color: '#22c55e', label: 'On Duty' },
    'on-break': { color: '#f59e0b', label: 'On Break' },
    'off-duty': { color: '#6b7280', label: 'Off Duty' },
  }
  return statusConfig[status as keyof typeof statusConfig] || statusConfig['off-duty']
}

export function getTripStatus(status: string) {
  const statusConfig = {
    scheduled: { color: '#0ea5e9', label: 'Scheduled' },
    'in-progress': { color: '#22c55e', label: 'In Progress' },
    completed: { color: '#8b5cf6', label: 'Completed' },
    cancelled: { color: '#ef4444', label: 'Cancelled' },
  }
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled
}

export function getMaintenanceSeverity(severity: string) {
  const severityConfig = {
    critical: { color: '#ef4444', label: 'Critical' },
    high: { color: '#f59e0b', label: 'High' },
    medium: { color: '#eab308', label: 'Medium' },
    low: { color: '#22c55e', label: 'Low' },
  }
  return severityConfig[severity as keyof typeof severityConfig] || severityConfig.low
}

export function getHealthIndicator(health: number) {
  if (health >= 90) return { color: '#22c55e', label: 'Excellent' }
  if (health >= 75) return { color: '#84cc16', label: 'Good' }
  if (health >= 60) return { color: '#eab308', label: 'Fair' }
  return { color: '#ef4444', label: 'Poor' }
}

export function getSafetyIndicator(score: number) {
  if (score >= 95) return { color: '#22c55e', label: 'Excellent' }
  if (score >= 85) return { color: '#84cc16', label: 'Good' }
  if (score >= 75) return { color: '#eab308', label: 'Fair' }
  return { color: '#ef4444', label: 'Poor' }
}
