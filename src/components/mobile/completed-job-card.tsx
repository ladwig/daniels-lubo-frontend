"use client"

import Link from "next/link"
import { Calendar, FileText, ChevronRight, MapPin } from "lucide-react"

interface CompletedJob {
  id: string
  customerName: string
  partner: string
  type: string
  date: string
  projectId: string
  protocol: string
  location: string
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

export function CompletedJobCard({ job }: { job: CompletedJob }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">{job.customerName}, {job.partner}</h3>
          <div className="flex flex-col gap-2 mt-2">
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
} 