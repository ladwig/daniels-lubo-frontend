"use client"

import { NavigationBar } from "@/components/mobile/navigation-bar"

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
        <span className="text-gray-900 text-lg font-medium">Inventar</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Add your inventory content here */}
      </div>

      <NavigationBar />
    </div>
  )
} 