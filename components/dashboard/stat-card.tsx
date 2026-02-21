'use client'

import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  unit?: string
  icon: ReactNode
  trend?: number
  color?: 'green' | 'blue' | 'orange' | 'red'
  onClick?: () => void
}

const colorStyles = {
  green: 'text-green-500 bg-green-500/10',
  blue: 'text-blue-600 bg-blue-600/10',
  orange: 'text-orange-500 bg-orange-500/10',
  red: 'text-red-500 bg-red-500/10',
}

export function StatCard({
  title,
  value,
  unit,
  icon,
  trend,
  color = 'blue',
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className="p-6 bg-card border border-border rounded-lg hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-3">
          {trend >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-xs font-medium ${
              trend >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {Math.abs(trend)}% from last month
          </span>
        </div>
      )}
    </div>
  )
}
