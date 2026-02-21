'use client'

import { Driver } from '@/lib/mock-data'
import { Trophy, Medal, Star } from 'lucide-react'

interface SafetyLeaderboardProps {
  drivers: Driver[]
}

export function SafetyLeaderboard({ drivers }: SafetyLeaderboardProps) {
  const sortedDrivers = [...drivers].sort((a, b) => b.safetyScore - a.safetyScore)

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 2:
        return <Medal className="w-5 h-5 text-orange-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">{rank + 1}</span>
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Safety Leaderboard</h2>

      <div className="space-y-3">
        {sortedDrivers.slice(0, 5).map((driver, index) => (
          <div
            key={driver.id}
            className="flex items-center justify-between p-4 bg-accent/5 rounded-lg"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center justify-center w-8 h-8">
                {getMedalIcon(index)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{driver.name}</p>
                <p className="text-xs text-muted-foreground">{driver.tripsThisMonth} trips this month</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                {driver.safetyScore >= 95 && (
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                )}
              </div>
              <p className="font-bold text-accent">{driver.safetyScore}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
