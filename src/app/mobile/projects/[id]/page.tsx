"use client"

import Link from "next/link"
import { ChevronLeft, MapPin, Phone, Mail, Calendar, Clock } from "lucide-react"

export default function ProjectDetailPage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-blue-500 px-4 py-3 flex items-center">
        <Link href="/mobile" className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <span className="text-white text-lg font-medium ml-3">Projekt Details</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Hero Section */}
        <div className="bg-blue-500 px-4 pb-8 pt-2">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-white/70 text-sm">Projekt ID</div>
            <div className="text-white text-xl font-medium mt-1">PRJ001</div>
            <div className="mt-4 bg-blue-600 rounded-lg px-3 py-1 text-white text-sm inline-block">
              In Bearbeitung
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="p-4 space-y-4 -mt-4">
          {/* Customer Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium mb-4">Kundeninformationen</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span className="text-sm">123 Main St, 10115 Berlin</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3" />
                <span className="text-sm">+49 123 456789</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                <span className="text-sm">john.doe@example.com</span>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium mb-4">Nächste Termine</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <div className="font-medium">Standortbesichtigung</div>
                  <div className="text-sm text-gray-500 mt-1">15. Februar 2024</div>
                </div>
                <div className="ml-auto flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">2h</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <div className="font-medium">Installation</div>
                  <div className="text-sm text-gray-500 mt-1">20. Februar 2024</div>
                </div>
                <div className="ml-auto flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">4h</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Info Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium mb-4">Systeminformationen</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Typ</span>
                <span>Wärmepumpe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Modell</span>
                <span>EcoHeat Pro 9000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Leistung</span>
                <span>9 kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Installation</span>
                <span>Erdwärme</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 border-t bg-white">
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium">
          Termin hinzufügen
        </button>
      </div>
    </div>
  )
} 