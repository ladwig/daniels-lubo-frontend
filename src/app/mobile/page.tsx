"use client"

import Link from "next/link"
import { MapPin, Calendar, FileText, ChevronRight } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock data for jobs
const jobsData = {
  today: [
    {
      id: "1",
      customerName: "Annika Müller",
      partner: "1komma5",
      location: "Berlin Charlottenburg",
      type: "Installation",
      date: "Heute, 14:00",
      projectId: "PRJ001"
    },
    {
      id: "2",
      customerName: "David Langer",
      partner: "42watt",
      location: "Berlin Kreuzberg",
      type: "Gala",
      date: "Heute, 16:30",
      projectId: "PRJ004"
    }
  ],
  upcoming: [
    {
      id: "3",
      customerName: "Michael Schmidt",
      partner: "1komma5",
      location: "Berlin Mitte",
      type: "Isolierung",
      date: "Morgen, 09:30",
      projectId: "PRJ002"
    },
    {
      id: "4",
      customerName: "Sarah Weber",
      partner: "42watt",
      location: "Berlin Prenzlauer Berg",
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
      location: "Berlin Mitte",
      type: "Installation",
      date: "Gestern, 15:30",
      projectId: "PRJ005",
      protocol: "Installationsprotokoll_20240206.pdf"
    },
    {
      id: "6",
      customerName: "Lisa Klein",
      partner: "42watt",
      location: "Berlin Wedding",
      type: "Isolierung",
      date: "05.02.2024",
      projectId: "PRJ006",
      protocol: "Abnahmeprotokoll_20240205.pdf"
    }
  ]
}

// Helper function to get background color based on job type
const getTypeColor = (type: string) => {
  switch (type) {
    case "Installation":
      return "bg-blue-100 text-blue-700"
    case "Isolierung":
      return "bg-purple-100 text-purple-700"
    case "Gala":
      return "bg-green-100 text-green-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

// Job card component to avoid repetition
const JobCard = ({ job }: { job: typeof jobsData.today[0] }) => (
  <Link 
    href={`/mobile/projects/${job.projectId}`}
    key={job.id}
    className="block"
  >
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">{job.customerName}, {job.partner}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(job.type)}`}>
          {job.type}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{job.date}</span>
        </div>
      </div>
    </div>
  </Link>
)

// Completed job card with protocol
const CompletedJobCard = ({ job }: { job: typeof jobsData.completed[0] }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-medium">{job.customerName}, {job.partner}</h3>
        <div className="flex items-center text-gray-500 mt-1">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{job.date}</span>
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(job.type)}`}>
        {job.type}
      </span>
    </div>
    <Link 
      href={`/mobile/projects/${job.projectId}/protocol`}
      className="flex items-center justify-between mt-3 p-2 bg-gray-50 rounded-lg active:bg-gray-100"
    >
      <div className="flex items-center text-gray-600">
        <FileText className="w-4 h-4 mr-2 text-[#FEDC00]" />
        <span className="text-sm">Protokoll ansehen</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </Link>
  </div>
)

export default function MobilePage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
        <span className="text-gray-900 text-lg font-medium">Lubo</span>
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