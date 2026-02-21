'use client'

interface StatusBadgeProps {
  status: string
  variant?: 'vehicle' | 'driver' | 'trip' | 'maintenance'
  className?: string
}

const statusColors = {
  vehicle: {
    active: 'bg-green-500/20 text-green-500 border-green-500/30',
    maintenance: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
    idle: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
  },
  driver: {
    active: 'bg-green-500/20 text-green-500 border-green-500/30',
    'on-break': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    'off-duty': 'bg-gray-500/20 text-gray-500 border-gray-500/30',
  },
  trip: {
    scheduled: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
    'in-progress': 'bg-green-500/20 text-green-500 border-green-500/30',
    completed: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
    cancelled: 'bg-red-500/20 text-red-500 border-red-500/30',
  },
  maintenance: {
    critical: 'bg-red-500/20 text-red-500 border-red-500/30',
    high: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
    medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-500 border-green-500/30',
    pending: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-500 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-500 border-green-500/30',
  },
}

const statusLabels: Record<string, Record<string, string>> = {
  vehicle: {
    active: 'Active',
    maintenance: 'Maintenance',
    idle: 'Idle',
  },
  driver: {
    active: 'On Duty',
    'on-break': 'On Break',
    'off-duty': 'Off Duty',
  },
  trip: {
    scheduled: 'Scheduled',
    'in-progress': 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  },
  maintenance: {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
  },
}

export function StatusBadge({
  status,
  variant = 'vehicle',
  className = '',
}: StatusBadgeProps) {
  const colors = statusColors[variant] as Record<string, string>
  const labels = statusLabels[variant] as Record<string, string>
  const colorClass = colors[status] || 'bg-gray-500/20 text-gray-500'
  const label = labels[status] || status

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colorClass} ${className}`}
    >
      {label}
    </span>
  )
}
