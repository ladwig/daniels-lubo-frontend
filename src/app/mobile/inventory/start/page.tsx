"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Play } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

export default function StartInventoryPage() {
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/mobile" className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            Neue Inventur: B-SR 120 
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* Vehicle/Storage Unit Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fahrzeug
            </label>
            <select
              disabled
              className="w-full border rounded-lg p-2 bg-gray-50"
              defaultValue="B-SR 120"
            >
              <option>B-SR 120 - Mercedes-Benz Sprinter</option>
            </select>
          </div>

          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Projekt
            </label>
            <select
              disabled
              className="w-full border rounded-lg p-2 bg-gray-50"
              defaultValue="B-SR 120"
            >
              <option>Müller, 1komma5</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Letztes Projekt vor der Inventur
            </p>
          </div>

          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Benutzer
            </label>
            <select
              disabled
              className="w-full border rounded-lg p-2 bg-gray-50"
              defaultValue="Daniel Schmidt"
            >
              <option>Daniel Schmidt</option>
            </select>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Datum
            </label>
            <input
              type="date"
              defaultValue={today}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t bg-white p-4">
        <Link
          href="/mobile/inventory/scan"
          className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600] flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          <span>Inventur starten</span>
        </Link>
      </div>

      <NavigationBar />
    </div>
  )
} 