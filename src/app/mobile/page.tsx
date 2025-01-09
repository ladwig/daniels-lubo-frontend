"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Briefcase, Calendar, Settings, Menu } from "lucide-react"

export default function MobilePage() {
  const [selectedTab, setSelectedTab] = useState("projects")

  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-blue-500 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Menu className="w-6 h-6 text-white" />
          <span className="text-white text-lg font-medium ml-3">Lubo</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Project Cards */}
        <div className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500">Offene Projekte</div>
              <div className="text-2xl font-bold text-blue-500 mt-1">12</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500">Diese Woche</div>
              <div className="text-2xl font-bold text-green-500 mt-1">4</div>
            </div>
          </div>

          {/* Project List */}
          <div className="bg-white rounded-xl overflow-hidden">
            {[1, 2, 3].map((i) => (
              <Link 
                href={`/mobile/projects/${i}`} 
                key={i}
                className="block border-b last:border-b-0 p-4 active:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Projekt #{i}</h3>
                    <p className="text-sm text-gray-500 mt-1">Berlin, Deutschland</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    In Bearbeitung
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-white border-t flex justify-around py-2">
        <button 
          onClick={() => setSelectedTab("home")}
          className={`p-2 rounded-full ${selectedTab === "home" ? "text-blue-500" : "text-gray-400"}`}
        >
          <Home className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setSelectedTab("projects")}
          className={`p-2 rounded-full ${selectedTab === "projects" ? "text-blue-500" : "text-gray-400"}`}
        >
          <Briefcase className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setSelectedTab("calendar")}
          className={`p-2 rounded-full ${selectedTab === "calendar" ? "text-blue-500" : "text-gray-400"}`}
        >
          <Calendar className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setSelectedTab("settings")}
          className={`p-2 rounded-full ${selectedTab === "settings" ? "text-blue-500" : "text-gray-400"}`}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
} 