"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus, ChevronRight } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock data for checked items
const checkedItems = [
  {
    id: "item1",
    name: "Hammer",
    actualAmount: 2
  },
  {
    id: "item2",
    name: "Schraubendreher Set",
    actualAmount: 1
  },
  {
    id: "item3",
    name: "Wasserwaage",
    actualAmount: 0
  },
  {
    id: "item4",
    name: "Zange",
    actualAmount: 3
  },
  {
    id: "item5",
    name: "Schrauben 4x40mm",
    actualAmount: 50
  }
]

export default function InventoryOverviewPage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/mobile/inventory/scan" className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            Inventur Übersicht
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4">
          {/* Items List */}
          <div className="space-y-2">
            {checkedItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-center"
              >
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium">{item.actualAmount}</span>
                  <Link 
                    href={`/mobile/inventory/scan?item=${item.id}`}
                    className="text-[#FEDC00]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t bg-white p-4 space-y-3">
        <Link
          href="/mobile/inventory/manual-add"
          className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Artikel manuell hinzufügen</span>
        </Link>
        <Link
          href="/mobile/inventory/complete"
          className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600] flex items-center justify-center gap-2"
        >
          <span>Inventur abschließen</span>
        </Link>
      </div>

      <NavigationBar />
    </div>
  )
} 