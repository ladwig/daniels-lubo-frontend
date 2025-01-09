"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, FileText, CheckCircle, Wrench, User, ChevronLeft } from "lucide-react"
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
    power: "9 kW",
    details: "Luft-Wasser-Wärmepumpe mit integriertem Warmwasserspeicher",
    installationDate: "15.02.2024"
  },
  documents: [
    { id: "1", name: "Auftragsbestätigung.pdf", date: "01.02.2024", type: "Vertrag" },
    { id: "2", name: "Technische Zeichnung.pdf", date: "03.02.2024", type: "Planung" },
    { id: "3", name: "Wärmepumpen-Datenblatt.pdf", date: "03.02.2024", type: "Technik" }
  ],
  tasks: [
    { id: "1", title: "Vorbereitung der Baustelle", status: "completed" },
    { id: "2", title: "Installation der Wärmepumpe", status: "pending" },
    { id: "3", title: "Elektrische Anschlüsse", status: "pending" },
    { id: "4", title: "Endabnahme", status: "pending" }
  ]
}

type TabType = "customer" | "project" | "documents"

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("customer")

  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-gray-50 border-b px-4 py-3 flex items-center gap-3">
        <Link href="/mobile" className="text-gray-600">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <span className="text-gray-900 text-lg font-medium">
          {projectData.id}
        </span>
      </div>

      {/* Tabs */}
      <div className="bg-gray-50 px-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab("customer")}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "customer"
                ? "border-[#FEDC00] text-gray-900"
                : "border-transparent text-gray-600"
            }`}
          >
            Kunde
          </button>
          <button
            onClick={() => setActiveTab("project")}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "project"
                ? "border-[#FEDC00] text-gray-900"
                : "border-transparent text-gray-600"
            }`}
          >
            Projekt
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "documents"
                ? "border-[#FEDC00] text-gray-900"
                : "border-transparent text-gray-600"
            }`}
          >
            Dokumente
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Tab Content */}
        <div className="bg-white">
          {/* Customer Tab */}
          {activeTab === "customer" && (
            <div className="divide-y">
              <div className="p-4">
                <div className="flex items-center text-gray-600 mb-4">
                  <User className="w-5 h-5 mr-3 text-[#FEDC00]" />
                  <span className="font-medium">{projectData.customer.contactPerson}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-[#FEDC00]" />
                    <span className="text-sm">{projectData.customer.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-[#FEDC00]" />
                    <span className="text-sm">{projectData.customer.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Tab */}
          {activeTab === "project" && (
            <div className="divide-y">
              <div className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[#FEDC00]" />
                  System Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Typ</span>
                    <span className="font-medium">{projectData.system.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Modell</span>
                    <span className="font-medium">{projectData.system.model}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Leistung</span>
                    <span className="font-medium">{projectData.system.power}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Installation</span>
                    <span className="font-medium">{projectData.system.installationDate}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  {projectData.system.details}
                </p>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="divide-y">
              {projectData.documents.map((doc) => (
                <div key={doc.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-[#FEDC00] mr-3" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-gray-500">{doc.date}</div>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {doc.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tasks Section - Always Visible */}
        <div className="mt-4 px-4 pb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#FEDC00]" />
              Aufgaben
            </h3>
            <div className="space-y-3">
              {projectData.tasks.map((task) => (
                <div key={task.id} className="flex items-center">
                  <CheckCircle 
                    className={`w-5 h-5 mr-3 ${
                      task.status === 'completed' 
                        ? 'text-green-500' 
                        : 'text-gray-300'
                    }`} 
                  />
                  <span className={
                    task.status === 'completed' 
                      ? 'line-through text-gray-500' 
                      : 'text-gray-900'
                  }>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  )
} 