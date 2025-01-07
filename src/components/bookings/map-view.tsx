'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Card } from '@/components/ui/card'
import L from 'leaflet'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
)

// Fix for default marker icons in Next.js
function createColoredIcon(color: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="24" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" d="M50 0C30 0 12.5 17.5 12.5 37.5c0 25 37.5 62.5 37.5 62.5s37.5-37.5 37.5-62.5C87.5 17.5 70 0 50 0zm0 50c-7.5 0-12.5-5-12.5-12.5S42.5 25 50 25s12.5 5 12.5 12.5S57.5 50 50 50z"/>
      </svg>
    `,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  })
}

interface CraftsmanLocation {
  id: string
  name: string
  role: string
  color: string
  location: {
    lat: number
    lng: number
  }
  route: {
    lat: number
    lng: number
  }[]
}

interface MapViewProps {
  craftsmenLocations: CraftsmanLocation[]
}

export default function MapView({ craftsmenLocations }: MapViewProps) {
  const [isClient, setIsClient] = useState(false)
  const defaultCenter: LatLngTuple = [51.1657, 10.4515]

  useEffect(() => {
    setIsClient(true)
    // Fix for marker icons in Next.js
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    // Add custom marker styles
    const style = document.createElement('style')
    style.textContent = `
      .custom-marker {
        background: none;
        border: none;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])

  if (!isClient) {
    return <Card className="h-[800px] overflow-hidden">Loading map...</Card>
  }

  return (
    <Card className="h-[800px] overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {craftsmenLocations.map((craftsman) => {
          const position: LatLngTuple = [craftsman.location.lat, craftsman.location.lng]
          return (
            <div key={craftsman.id}>
              <Marker position={position} icon={createColoredIcon(craftsman.color)}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium">{craftsman.name}</h3>
                    <p className="text-sm text-muted-foreground">{craftsman.role}</p>
                  </div>
                </Popup>
              </Marker>
              {craftsman.route.map((pos, index) => {
                const stopPosition: LatLngTuple = [pos.lat, pos.lng]
                return (
                  <Marker
                    key={`${craftsman.id}-stop-${index}`}
                    position={stopPosition}
                    icon={L.divIcon({
                      className: 'custom-marker',
                      html: `
                        <svg width="12" height="12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="50" cy="50" r="40" fill="${craftsman.color}" opacity="0.5"/>
                        </svg>
                      `,
                      iconSize: [12, 12],
                      iconAnchor: [6, 6],
                    })}
                  >
                    <Popup>
                      <div className="p-2">
                        <p className="text-sm">Zwischenstopp von {craftsman.name}</p>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
              <Polyline
                positions={craftsman.route.map(pos => [pos.lat, pos.lng] as LatLngTuple)}
                pathOptions={{
                  color: craftsman.color,
                  weight: 2,
                  dashArray: '5, 10',
                  opacity: 0.7
                }}
              />
            </div>
          )
        })}
      </MapContainer>
    </Card>
  )
} 