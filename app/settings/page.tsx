'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { useAuth } from '@/lib/auth-context'
import {
  Bell,
  Lock,
  Palette,
  Globe,
  Truck,
  Shield,
  Check,
} from 'lucide-react'
import { useState } from 'react'

function SettingsContent() {
  const { user } = useAuth()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    maintenanceAlerts: true,
    tripUpdates: true,
    safetyAlerts: true,
    theme: 'dark',
    language: 'en',
    timezone: 'IST',
    currency: 'INR',
    autoDispatch: true,
    routeOptimization: true,
    fuelMonitoring: true,
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSelectChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        {/* Notification Settings */}
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary/10 px-6 py-4 border-b border-border flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Notification Preferences</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
              { key: 'smsNotifications', label: 'SMS Notifications', description: 'Get critical alerts via SMS' },
              { key: 'maintenanceAlerts', label: 'Maintenance Alerts', description: 'Notifications for vehicle maintenance' },
              { key: 'tripUpdates', label: 'Trip Updates', description: 'Real-time trip status updates' },
              { key: 'safetyAlerts', label: 'Safety Alerts', description: 'Driver safety and compliance notifications' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-muted/5 rounded-lg hover:bg-muted/10 transition">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={() => handleToggle(item.key)}
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition ${
                      settings[item.key as keyof typeof settings]
                        ? 'bg-accent'
                        : 'bg-muted'
                    }`}
                  />
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition transform ${
                      settings[item.key as keyof typeof settings]
                        ? 'translate-x-6'
                        : ''
                    }`}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary/10 px-6 py-4 border-b border-border flex items-center gap-3">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Display Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Theme</label>
              <div className="flex gap-3">
                {[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'auto', label: 'Auto' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={option.value}
                      checked={settings.theme === option.value}
                      onChange={(e) => handleSelectChange('theme', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label htmlFor="language" className="block text-sm font-semibold text-foreground mb-2">
                Language
              </label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label htmlFor="timezone" className="block text-sm font-semibold text-foreground mb-2">
                Timezone
              </label>
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleSelectChange('timezone', e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="IST">India Standard Time (IST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block text-sm font-semibold text-foreground mb-2">
                Currency
              </label>
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => handleSelectChange('currency', e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fleet Settings */}
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary/10 px-6 py-4 border-b border-border flex items-center gap-3">
            <Truck className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Fleet Management</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { key: 'autoDispatch', label: 'Auto Dispatch', description: 'Automatically assign trips to available drivers' },
              { key: 'routeOptimization', label: 'Route Optimization', description: 'Use AI for optimal route planning' },
              { key: 'fuelMonitoring', label: 'Fuel Monitoring', description: 'Track fuel consumption and efficiency' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-muted/5 rounded-lg hover:bg-muted/10 transition">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={() => handleToggle(item.key)}
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition ${
                      settings[item.key as keyof typeof settings]
                        ? 'bg-accent'
                        : 'bg-muted'
                    }`}
                  />
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition transform ${
                      settings[item.key as keyof typeof settings]
                        ? 'translate-x-6'
                        : ''
                    }`}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary/10 px-6 py-4 border-b border-border flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Security & Privacy</h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-muted/5 hover:bg-muted/10 rounded-lg transition">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your password regularly</p>
                </div>
              </div>
              <span className="text-muted-foreground">&rarr;</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-muted/5 hover:bg-muted/10 rounded-lg transition">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                </div>
              </div>
              <span className="text-muted-foreground">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition">
            <Check className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}
