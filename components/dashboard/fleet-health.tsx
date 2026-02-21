'use client'

import { Vehicle } from '@/lib/mock-data'
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface FleetHealthProps {
  vehicles: Vehicle[]
}

export function FleetHealth({ vehicles }: FleetHealthProps) {
  const healthCounts = {
    excellent: vehicles.filter((v) => v.health >= 90).length,
    good: vehicles.filter((v) => v.health >= 75 && v.health < 90).length,
    fair: vehicles.filter((v) => v.health >= 60 && v.health < 75).length,
    poor: vehicles.filter((v) => v.health < 60).length,
  }

  const totalHealth = vehicles.reduce((sum, v) => sum + v.health, 0) / vehicles.length

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Fleet Health</h2>

      <div className="space-y-4">
        {/* Overall Health */}
        <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Overall Health</p>
            <p className="text-2xl font-bold text-foreground">
              {totalHealth.toFixed(1)}%
            </p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>

        {/* Health Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Excellent (90%+)</span>
            <span className="font-medium text-green-500">{healthCounts.excellent}</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${(healthCounts.excellent / vehicles.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Good (75-90%)</span>
            <span className="font-medium text-blue-500">{healthCounts.good}</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${(healthCounts.good / vehicles.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Fair (60-75%)</span>
            <span className="font-medium text-yellow-500">{healthCounts.fair}</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{
                width: `${(healthCounts.fair / vehicles.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Poor (Below 60%)</span>
            <span className="font-medium text-red-500">{healthCounts.poor}</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{
                width: `${(healthCounts.poor / vehicles.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
