"use client"

import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"

interface Job {
  id: string
  customerName: string
  partner: string
  location: string
  type: string
  date: string
  projectId: string
  isInventoryLink?: boolean
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
    case "Inventur":
      return "bg-yellow-100 text-yellow-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link 
      href={job.isInventoryLink ? "/mobile/inventory/start" : `/mobile/projects/${job.projectId}`}
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
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{job.date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
} 