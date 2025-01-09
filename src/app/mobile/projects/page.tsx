"use client"

import { Menu } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-[#FEDC00] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Menu className="w-6 h-6 text-white" />
          <span className="text-white text-lg font-medium ml-3">Projekte</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Add your projects content here */}
      </div>

      <NavigationBar />
    </div>
  )
} 