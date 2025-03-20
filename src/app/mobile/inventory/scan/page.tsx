"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Minus, Plus, Hash } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock item data - in production this would come from QR code scan
const mockItem = {
  id: "item1",
  name: "Hammer",
  expectedAmount: 2
}

export default function ScanInventoryPage() {
  const [amount, setAmount] = useState(mockItem.expectedAmount)
  const [showManualInput, setShowManualInput] = useState(false)
  const [itemNumber, setItemNumber] = useState("")

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
          <Link href="/mobile/inventory/start" className="text-gray-600">
            <X className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            Inventurprüfung
          </span>
        </div>
      </div>

      {/* Camera Preview */}
      <div className="bg-black aspect-[4/3] relative">
        {/* This would be replaced with actual camera preview */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p>Camera Preview - Scan QR Code</p>
        </div>
        {/* Scanning overlay/guides would go here */}
        <div className="absolute inset-0 border-2 border-[#FEDC00] m-8 rounded-lg"></div>

        {/* Manual Input Button */}
        <button
          onClick={() => setShowManualInput(!showManualInput)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
        >
          <Hash className="w-5 h-5 text-gray-600" />
        </button>

        {/* Manual Input Overlay */}
        {showManualInput && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white rounded-xl w-full max-w-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Artikelnummer eingeben
                </label>
                <button 
                  onClick={() => setShowManualInput(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={itemNumber}
                onChange={(e) => setItemNumber(e.target.value)}
                placeholder="z.B. 12345"
                className="w-full border rounded-lg p-2 mb-4"
                autoFocus
              />
              <button
                onClick={() => setShowManualInput(false)}
                className="w-full bg-[#FEDC00] text-white py-2 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600]"
              >
                Bestätigen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4">
          {/* Item Card */}
          {(mockItem || itemNumber) && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t bg-white p-4">
        <Link
          href="/mobile/inventory/overview"
          className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600] flex items-center justify-center gap-2"
        >
          <span>Weiter</span>
        </Link>
      </div>

      <NavigationBar />
    </div>
  )
} 