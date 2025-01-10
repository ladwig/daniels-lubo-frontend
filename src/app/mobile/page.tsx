"use client"

import { useState } from "react"
import { Cloud } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"
import { JobCard } from "@/components/mobile/job-card"
import { CompletedJobCard } from "@/components/mobile/completed-job-card"

function SyncIcon() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (!isLoading) {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 1000)
    }
  }

  return (
    <button 
      onClick={handleClick}
      className="relative w-5 h-5"
      aria-label="Sync"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-full h-full border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <Cloud className="w-5 h-5 text-green-500" />
      )}
    </button>
  )
}

// Mock data for jobs
const jobsData = {
  today: [
    {
      id: "1",
      customerName: "Annika Müller",
      partner: "1komma5",
      location: "Langestraße 49, 23945 Zürich", 
      type: "Installation",
      date: "Heute, 08:00",
      projectId: "PRJ001"
    },
    {
      id: "2",
      customerName: "David Langer",
      partner: "42watt",
      location: "Gera Straße 12, 10115 München",
      type: "Installation",
      date: "Heute, 16:30",
      projectId: "PRJ004"
    }
  ],
  upcoming: [
    {
      id: "inventory",
      customerName: "Lagerbestand",
      partner: "Inventur",
      location: "B-SR 120",
      type: "Inventur",
      date: "Morgen, 08:00",
      projectId: "inventory",
      isInventoryLink: true
    },
    {
      id: "3",
      customerName: "Michael Schmidt",
      partner: "1komma5",
      location: "Langestraße 123, 10115 Berlin",
      type: "Isolierung",
      date: "Morgen, 09:30",
      projectId: "PRJ002"
    },
    {
      id: "4",
      customerName: "Sarah Weber",
      partner: "42watt",
      location: "Köpenicker Straße 22, 10115 Berlin",
      type: "Gala",
      date: "Übermorgen, 11:00",
      projectId: "PRJ003"
    }
  ],
  completed: [
    {
      id: "5",
      customerName: "Thomas Bauer",
      partner: "1komma5",
      location: "Langestraße 123, 10115 Berlin",
      type: "Installation",
      date: "Gestern, 15:30",
      projectId: "PRJ005",
      protocol: "Installationsprotokoll_20240206.pdf"
    },
    {
      id: "6",
      customerName: "Lisa Klein",
      partner: "42watt",
      location: "Köpenicker Straße 123, 10115 Berlin",
      type: "Isolierung",
      date: "05.02.2024",
      projectId: "PRJ006",
      protocol: "Abnahmeprotokoll_20240205.pdf"
    }
  ]
}

export default function MobilePage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <span className="text-gray-900 text-lg font-medium">Deine Jobs</span>
        <SyncIcon />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Today's Jobs */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Heute</h2>
          <div className="space-y-3">
            {jobsData.today.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Upcoming Jobs */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Demnächst</h2>
          <div className="space-y-3">
            {jobsData.upcoming.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Completed Jobs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Abgeschlossen</h2>
          <div className="space-y-3">
            {jobsData.completed.map((job) => (
              <CompletedJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  )
} 