// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { LatLngExpression, DivIcon } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
)
const Polyline = dynamic(
  () => import('react-leaflet').then(mod => mod.Polyline),
  { ssr: false }
)

interface CraftsmanLocation {
  id: string
  name: string
  role: string
  color: string
  location: {
    lat: number
    lng: number
  }
  route: Array<{
    lat: number
    lng: number
  }>
}

interface MapViewProps {
  craftsmenLocations: CraftsmanLocation[]
}

// Fix the marker icon issue
const defaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = defaultIcon

export default function MapView({ craftsmenLocations }: MapViewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[800px] flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Lade Karte...</p>
      </div>
    )
  }

  // Create custom icons for each craftsman
  const createCustomIcon = (color: string): DivIcon => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    })
  }

  // Calculate map bounds to fit all markers
  const points: LatLngExpression[] = craftsmenLocations.map(c => [c.location.lat, c.location.lng])
  const bounds = L.latLngBounds(points)
  const center: LatLngExpression = [bounds.getCenter().lat, bounds.getCenter().lng]

  return (
    <div className="h-[800px]">
      {/* @ts-ignore */}
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* @ts-ignore */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {craftsmenLocations.map((craftsman) => (
          <div key={craftsman.id}>
            {/* @ts-ignore */}
            <Marker
              position={[craftsman.location.lat, craftsman.location.lng] as LatLngExpression}
              icon={createCustomIcon(craftsman.color)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium">{craftsman.name}</h3>
                  <p className="text-sm text-muted-foreground">{craftsman.role}</p>
                </div>
              </Popup>
            </Marker>
            {craftsman.route && (
              <Polyline
                positions={craftsman.route.map(point => [point.lat, point.lng] as LatLngExpression)}
                pathOptions={{
                  color: craftsman.color,
                  weight: 3,
                  opacity: 0.7,
                  dashArray: '10, 10'
                }}
              />
            )}
          </div>
        ))}
      </MapContainer>
    </div>
  )
} 