"use client"

import { LogOut, MapPin, Wrench, Trophy, Star } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock user data
const userData = {
  name: "Max Mustermann",
  homebase: "Berlin Mitte",
  craft: "Installateur",
  stats: {
    totalJobs: 156,
    thisMonth: 12,
    categories: [
      {
        type: "Installation",
        completed: 78,
        nextBonus: 80,
        multiplier: 1.2
      },
      {
        type: "Isolierung",
        completed: 45,
        nextBonus: 50,
        multiplier: 1.1
      },
      {
        type: "Gala",
        completed: 33,
        nextBonus: 35,
        multiplier: 1.0
      }
    ]
  }
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
        <span className="text-gray-900 text-lg font-medium">Profil</span>
        <button className="bg-[#FEDC00] text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#E5C700] active:bg-[#D1B600]">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* User Info Card */}
        <div className="p-4 bg-white">
          <h1 className="text-2xl font-bold mb-4">{userData.name}</h1>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3 text-[#FEDC00]" />
              <span>Standort: {userData.homebase}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Wrench className="w-5 h-5 mr-3 text-[#FEDC00]" />
              <span>Handwerk: {userData.craft}</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="p-4 border-t">
          <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FEDC00]" />
            Statistiken
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500">Gesamt Aufträge</div>
              <div className="text-2xl font-bold text-[#FEDC00]">{userData.stats.totalJobs}</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500">Diesen Monat</div>
              <div className="text-2xl font-bold text-[#FEDC00]">{userData.stats.thisMonth}</div>
            </div>
          </div>
        </div>

        {/* Bonus System */}
        <div className="p-4 border-t">
          <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#FEDC00]" />
            Bonus System
          </h2>
          <div className="space-y-3">
            {userData.stats.categories.map((category) => (
              <div key={category.type} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{category.type}</span>
                  <span className="text-sm bg-[#FEDC00] text-white px-2 py-1 rounded-full">
                    {category.multiplier}x
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">
                    {category.completed} von {category.nextBonus} für nächsten Bonus
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-[#FEDC00] h-2 rounded-full" 
                      style={{ width: `${(category.completed / category.nextBonus) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  )
} 