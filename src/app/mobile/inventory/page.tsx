"use client"

import { NavigationBar } from "@/components/mobile/navigation-bar"
import { Cloud } from "lucide-react"

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <span className="text-gray-900 text-lg font-medium">Inventar</span>
        <Cloud className="w-5 h-5 text-green-500" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Add your inventory content here */}
      </div>

      <NavigationBar />
    </div>
  )
} 