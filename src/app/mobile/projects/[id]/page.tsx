"use client"

import Link from "next/link"
import { ChevronLeft, MapPin, Phone, FileText, CheckCircle, Wrench, User } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Mock data for project details
const projectData = {
  id: "PRJ001",
  customer: {
    contactPerson: "Herr Müller",
    address: "Kurfürstendamm 123, 10711 Berlin",
    phone: "+49 30 12345678"
  },
  system: {
    type: "Wärmepumpe",
    model: "EcoHeat Pro 9000",
    power: "9 kW"
  },
  type: "Installation",
  documents: [
    { id: "1", name: "Auftragsbestätigung.pdf", date: "01.02.2024" },
    { id: "2", name: "Technische Zeichnung.pdf", date: "03.02.2024" }
  ],
  tasks: [
    { id: "1", title: "Vorbereitung der Baustelle", status: "completed" },
    { id: "2", title: "Installation der Wärmepumpe", status: "pending" },
    { id: "3", title: "Elektrische Anschlüsse", status: "pending" },
    { id: "4", title: "Endabnahme", status: "pending" }
  ]
}

export default function ProjectDetailPage() {
  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-[#FEDC00] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/mobile" className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-white text-lg font-medium ml-3">
            Projektdetails {projectData.id}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Customer Info Card */}
        <div className="p-4 bg-white">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <User className="w-5 h-5 mr-3 text-[#FEDC00]" />
              <span className="text-sm">{projectData.customer.contactPerson}</span>
            </div>
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(projectData.customer.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 active:opacity-70"
            >
              <MapPin className="w-5 h-5 mr-3 text-[#FEDC00]" />
              <span className="text-sm underline">{projectData.customer.address}</span>
            </a>
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-3 text-[#FEDC00]" />
              <span className="text-sm">{projectData.customer.phone}</span>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center mb-3">
            <Wrench className="w-5 h-5 text-[#FEDC00] mr-2" />
            <h3 className="font-medium">System</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Typ</p>
              <p className="font-medium">{projectData.system.type}</p>
            </div>
            <div>
              <p className="text-gray-500">Modell</p>
              <p className="font-medium">{projectData.system.model}</p>
            </div>
            <div>
              <p className="text-gray-500">Leistung</p>
              <p className="font-medium">{projectData.system.power}</p>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="p-4 border-t">
          <h3 className="font-medium mb-3">Dokumente</h3>
          <div className="space-y-2">
            {projectData.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-[#FEDC00] mr-3" />
                  <div>
                    <div className="text-sm font-medium">{doc.name}</div>
                    <div className="text-xs text-gray-500">{doc.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="p-4 border-t">
          <h3 className="font-medium mb-3">Offene Aufgaben</h3>
          <div className="space-y-2">
            {projectData.tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-3 ${task.status === 'completed' ? 'text-green-500' : 'text-gray-300'}`} />
                  <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>{task.title}</span>
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