'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useState } from 'react'

/* Fix Leaflet marker icons for Next.js */
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

/* MATCH YOUR REAL VEHICLE DATA STRUCTURE */
type Vehicle = {
  id: string
  name: string
  status: string
  location: {
    lat: number
    lng: number
  }
}

export function FleetMap({ vehicles }: { vehicles: Vehicle[] }) {
  const [selected, setSelected] = useState<Vehicle | null>(null)

  const center: [number, number] = [23.0225, 72.5714]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Fleet Tracking Map</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAP */}
        <div className="lg:col-span-2 h-[520px] rounded-lg overflow-hidden">
          <MapContainer
            center={center}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {vehicles.map((v) => (
              <Marker
                key={v.id}
                position={[v.location.lat, v.location.lng]}
                eventHandlers={{ click: () => setSelected(v) }}
              >
                <Popup>
                  <b>{v.name}</b>
                  <br />
                  Status: {v.status}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-accent/10 rounded-lg p-6 flex items-center justify-center text-center">
          {selected ? (
            <div>
              <h3 className="font-semibold text-lg mb-2">{selected.name}</h3>
              <p>Status: {selected.status}</p>
              <p>ID: {selected.id}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Click on a vehicle marker to view details
            </p>
          )}
        </div>

      </div>
    </div>
  )
}