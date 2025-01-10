"use client"

import { useState } from "react"
import Link from "next/link"
import { Car, ChevronRight, Plus, Calendar, ChevronLeft } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock data for vehicles and their inventory checks
const vehiclesData = [
  {
    id: "1",
    licensePlate: "B-SR 120",
    type: "Mercedes-Benz Sprinter",
    lastCheck: "05.02.2024",
    checks: [
      { id: "1", date: "05.02.2024", status: "completed" },
      { id: "2", date: "01.01.2024", status: "completed" },
      { id: "3", date: "01.12.2023", status: "completed" }
    ]
  },
  {
    id: "2",
    licensePlate: "B-SR 121",
    type: "Mercedes-Benz Sprinter",
    lastCheck: "01.02.2024",
    checks: [
      { id: "1", date: "01.02.2024", status: "completed" },
      { id: "2", date: "01.01.2024", status: "completed" }
    ]
  },
  {
    id: "3",
    licensePlate: "B-SR 122",
    type: "Mercedes-Benz Sprinter",
    lastCheck: "28.01.2024",
    checks: [
      { id: "1", date: "28.01.2024", status: "completed" },
      { id: "2", date: "28.12.2023", status: "completed" }
    ]
  }
]

export default function InventoryPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehiclesData[number] | null>(null)

  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {selectedVehicle ? (
            <button 
              onClick={() => setSelectedVehicle(null)}
              className="text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : (
            <Link href="/mobile" className="text-gray-600">
              <ChevronLeft className="w-6 h-6" />
            </Link>
          )}
          <span className="text-gray-900 text-lg font-medium">
            {selectedVehicle ? selectedVehicle.licensePlate : 'Inventur'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {!selectedVehicle ? (
          // Vehicle List
          <div className="space-y-3">
            {vehiclesData.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className="w-full bg-white rounded-xl p-4 shadow-sm text-left"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-[#FEDC00] mt-1" />
                    <div>
                      <h3 className="font-medium">{vehicle.licensePlate}</h3>
                      <p className="text-xs text-gray-400 mt-1">{vehicle.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Letzte Prüfung</p>
                      <p className="text-sm text-gray-600">{vehicle.lastCheck}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Vehicle Detail with Checks
          <div>
            {/* Vehicle Info */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-[#FEDC00] mt-1" />
                <div>
                  <h3 className="font-medium">{selectedVehicle.licensePlate}</h3>
                  <p className="text-xs text-gray-400 mt-1">{selectedVehicle.type}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mb-6">
              <Link
                href={`/mobile/inventory/${selectedVehicle.id}/new-check`}
                className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600] flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>Neue Inventur</span>
              </Link>
            </div>

            {/* Checks List */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Inventurprüfungen</h3>
              <div className="space-y-3">
                {selectedVehicle.checks.map((check) => (
                  <Link
                    key={check.id}
                    href={`/mobile/inventory/${selectedVehicle.id}/check/${check.id}`}
                    className="block bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#FEDC00]" />
                        <span className="text-sm">{check.date}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <NavigationBar />
    </div>
  )
} 