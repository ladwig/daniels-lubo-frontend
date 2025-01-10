"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight, Box, Play } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock data for inventory items structure
const inventoryStructure = [
  {
    id: "box1",
    name: "Hauptfach",
    type: "box",
    items: [
      {
        id: "box1.1",
        name: "Werkzeugkasten",
        type: "box",
        items: [
          { id: "item1", name: "Hammer", type: "item" },
          { id: "item2", name: "Schraubendreher Set", type: "item" },
          { id: "item3", name: "Zange", type: "item" }
        ]
      },
      {
        id: "box1.2",
        name: "Verbrauchsmaterial",
        type: "box",
        items: [
          { id: "item4", name: "Schrauben", type: "item" },
          { id: "item5", name: "Dübel", type: "item" },
          { id: "item6", name: "Klebeband", type: "item" }
        ]
      }
    ]
  },
  {
    id: "box2",
    name: "Seitenfach Links",
    type: "box",
    items: [
      {
        id: "box2.1",
        name: "Elektrowerkzeuge",
        type: "box",
        items: [
          { id: "item7", name: "Bohrmaschine", type: "item" },
          { id: "item8", name: "Akkuschrauber", type: "item" }
        ]
      }
    ]
  },
  {
    id: "box3",
    name: "Seitenfach Rechts",
    type: "box",
    items: [
      {
        id: "box3.1",
        name: "Sicherheitsausrüstung",
        type: "box",
        items: [
          { id: "item9", name: "Handschuhe", type: "item" },
          { id: "item10", name: "Schutzbrille", type: "item" },
          { id: "item11", name: "Warnweste", type: "item" }
        ]
      }
    ]
  }
]

export default function NewInventoryCheckPage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href=".." className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            Neue Inventur
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-6">
            Überprüfen Sie die folgenden Bereiche und Gegenstände auf Vollständigkeit und Zustand.
          </div>

          {/* Inventory Structure */}
          <div className="space-y-3">
            {inventoryStructure.map((box) => (
              <div key={box.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Main Box */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Box className="w-5 h-5 text-[#FEDC00]" />
                    <span className="font-medium">{box.name}</span>
                  </div>
                </div>

                {/* Sub Boxes */}
                <div className="divide-y">
                  {box.items.map((subBox) => (
                    <div key={subBox.id} className="p-4 pl-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Box className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{subBox.name}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {subBox.items.length} Artikel
                        </div>
                      </div>
                      {/* Items Preview */}
                      <div className="mt-2 pl-7">
                        <p className="text-xs text-gray-400">
                          {subBox.items.map(item => item.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t bg-white p-4">
        <Link
          href="start-check"
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