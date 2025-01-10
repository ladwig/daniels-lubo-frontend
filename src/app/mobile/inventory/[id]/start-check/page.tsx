"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Box, Minus, Plus } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock data for a single item check
const mockItem = {
  id: "item1",
  name: "Hammer",
  location: {
    main: "Hauptfach",
    sub: "Werkzeugkasten"
  },
  expectedAmount: 2,
  imageUrl: "/images/tools/hammer.jpg" // This would be a real image path in production
}

export default function InventoryCheckPage() {
  const [amount, setAmount] = useState(mockItem.expectedAmount)

  const handleDecrement = () => {
    if (amount > 0) setAmount(amount - 1)
  }

  const handleIncrement = () => {
    setAmount(amount + 1)
  }

  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href=".." className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            Inventurprüfung
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Location Info */}
        <div className="bg-white px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-[#FEDC00]" />
            <div>
              <div className="text-sm font-medium">{mockItem.location.main}</div>
              <div className="text-xs text-gray-500">{mockItem.location.sub}</div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Item Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Image */}
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {/* This would be a real image in production */}
              <div className="w-32 h-32 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Item Details */}
            <div className="p-4">
              <h2 className="text-lg font-medium mb-6">{mockItem.name}</h2>

              {/* Amount Inputs Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Expected Amount */}
                <div>
                  <div className="text-sm text-gray-500 mb-2">Erwartete Menge</div>
                  <div className="text-3xl font-medium">{mockItem.expectedAmount}</div>
                </div>

                {/* Actual Amount */}
                <div>
                  <div className="text-sm text-gray-500 mb-2">Tatsächliche Menge</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDecrement}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="text-3xl font-medium w-10 text-center">
                      {amount}
                    </div>

                    <button
                      onClick={handleIncrement}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t bg-white p-4">
        <Link
          href="next-item"
          className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600] flex items-center justify-center gap-2"
        >
          <span>Weiter</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      <NavigationBar />
    </div>
  )
} 