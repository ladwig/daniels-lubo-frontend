"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Search, Plus, Minus } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock data for available items
const availableItems = [
  { id: "1", name: "Hammer", category: "Werkzeug" },
  { id: "2", name: "Schraubendreher Kreuz", category: "Werkzeug" },
  { id: "3", name: "Schraubendreher Schlitz", category: "Werkzeug" },
  { id: "4", name: "Wasserwaage 60cm", category: "Werkzeug" },
  { id: "5", name: "Zange", category: "Werkzeug" },
  { id: "6", name: "Schrauben 4x40mm", category: "Verbrauchsmaterial" },
  { id: "7", name: "Schrauben 4x60mm", category: "Verbrauchsmaterial" },
  { id: "8", name: "Dübel 6mm", category: "Verbrauchsmaterial" },
  { id: "9", name: "Dübel 8mm", category: "Verbrauchsmaterial" },
  { id: "10", name: "Isolierband", category: "Verbrauchsmaterial" }
]

export default function ManualAddPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<typeof availableItems[0] | null>(null)
  const [amount, setAmount] = useState(1)

  const filteredItems = availableItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDecrement = () => {
    if (amount > 1) setAmount(amount - 1)
  }

  const handleIncrement = () => {
    setAmount(amount + 1)
  }

  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/mobile/inventory/overview" className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            Artikel hinzufügen
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedItem(null)
            }}
            placeholder="Artikel suchen..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4">
          {!selectedItem ? (
            // Search Results
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item)
                    setAmount(1)
                  }}
                  className="w-full bg-white rounded-lg p-3 shadow-sm text-left"
                >
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </button>
              ))}
            </div>
          ) : (
            // Selected Item
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium mb-4">{selectedItem.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Menge</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDecrement}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">
                    {amount}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {selectedItem && (
        <div className="border-t bg-white p-4">
          <Link
            href="/mobile/inventory/overview"
            className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600] flex items-center justify-center gap-2"
          >
            <span>Hinzufügen</span>
          </Link>
        </div>
      )}

      <NavigationBar />
    </div>
  )
} 