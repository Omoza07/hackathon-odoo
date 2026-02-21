'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  company: string
  role: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('fleetflow_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        localStorage.removeItem('fleetflow_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simple validation - in production this would call an API
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Demo credentials
    const demoUsers: Record<string, { password: string; user: User }> = {
      'admin@fleetflow.com': {
        password: 'admin123',
        user: {
          id: 'u001',
          name: 'Rajesh Kumar',
          email: 'admin@fleetflow.com',
          avatar: '/avatars/rajesh.jpg',
          company: 'FleetFlow India',
          role: 'Fleet Manager',
          phone: '+91 98765 43210',
        },
      },
      'driver@fleetflow.com': {
        password: 'driver123',
        user: {
          id: 'u002',
          name: 'Priya Sharma',
          email: 'driver@fleetflow.com',
          company: 'FleetFlow India',
          role: 'Driver',
          phone: '+91 98765 43211',
        },
      },
    }

    if (demoUsers[email] && demoUsers[email].password === password) {
      const newUser = demoUsers[email].user
      setUser(newUser)
      localStorage.setItem('fleetflow_user', JSON.stringify(newUser))
    } else {
      throw new Error('Invalid email or password')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fleetflow_user')
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
