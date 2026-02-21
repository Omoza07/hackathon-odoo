'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { useAuth } from '@/lib/auth-context'
import { User, Mail, Phone, Building2, Shield, Edit2 } from 'lucide-react'
import { useState } from 'react'

function ProfileContent() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="flex items-start gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-5xl font-bold mb-4">
                {user?.name.charAt(0) || 'U'}
              </div>
              <p className="text-sm text-muted-foreground text-center">Profile Avatar</p>
            </div>

            {/* Profile Information */}
            <div className="flex-1">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  ) : (
                    <p className="text-lg font-medium text-foreground">{user?.name || 'N/A'}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  ) : (
                    <p className="text-lg font-medium text-foreground">{user?.email || 'N/A'}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue={user?.phone}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  ) : (
                    <p className="text-lg font-medium text-foreground">{user?.phone || 'N/A'}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <Building2 className="w-4 h-4" />
                    Company
                  </label>
                  <p className="text-lg font-medium text-foreground">{user?.company || 'N/A'}</p>
                </div>

                {/* Role */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <Shield className="w-4 h-4" />
                    Role
                  </label>
                  <p className="text-lg font-medium text-foreground">{user?.role || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form Footer */}
          {isEditing && (
            <div className="mt-8 pt-6 border-t border-border flex gap-3">
              <button className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Account Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Account Status</p>
            <p className="text-2xl font-bold text-green-500">Active</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Member Since</p>
            <p className="text-2xl font-bold text-foreground">2023</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Last Login</p>
            <p className="text-2xl font-bold text-foreground">Today</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
