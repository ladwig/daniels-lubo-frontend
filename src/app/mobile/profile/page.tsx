"use client"

import Link from "next/link"
import { ChevronLeft, LogOut, Settings } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock skills data
const skills = ["Installation", "Isolierung", "Gala"]

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/mobile" className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            Profil
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Profile Info */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl font-medium text-gray-500">JD</span>
              </div>
              <div>
                <h2 className="text-lg font-medium">John Doe</h2>
                <p className="text-sm text-gray-500">Techniker</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-xs bg-[#FEDC00] bg-opacity-10 text-[#FEDC00] px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Statistiken</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Aufträge (30 Tage)</div>
                <div className="text-2xl font-medium">24</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Bonus</div>
                <div className="text-2xl font-medium text-green-500">320€</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t bg-white p-4 space-y-3">
        <Link
          href="/mobile/profile/settings"
          className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center gap-2"
        >
          <Settings className="w-5 h-5" />
          <span>Einstellungen</span>
        </Link>
        <Link
          href="/mobile/logout"
          className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-medium hover:bg-red-100 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Abmelden</span>
        </Link>
      </div>

      <NavigationBar />
    </div>
  )
} 