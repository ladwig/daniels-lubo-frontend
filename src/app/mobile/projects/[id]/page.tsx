"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, FileText, CheckCircle, Wrench, User, ChevronLeft, Cloud, ChevronRight } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

type SubTaskType = "checkbox" | "photo" | "text" | "select"

interface SubTask {
  id: string
  title: string
  type: SubTaskType
  status: "completed" | "pending"
  options?: string[]
}

interface Task {
  id: string
  title: string
  status: "completed" | "pending"
  subTasks: SubTask[]
}

// Updated mock data with sub-tasks
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
    {
      id: "1",
      title: "Vorbereitung der Baustelle",
      status: "completed",
      subTasks: [
        { id: "1.1", title: "Arbeitsbereich absichern", type: "checkbox", status: "completed" },
        { id: "1.2", title: "Werkzeuge und Material prüfen", type: "checkbox", status: "completed" },
        { id: "1.3", title: "Fotodokumentation Ausgangszustand", type: "photo", status: "completed" }
      ]
    },
    {
      id: "2",
      title: "Installation der Wärmepumpe",
      status: "pending",
      subTasks: [
        { id: "2.1", title: "Fundament prüfen", type: "checkbox", status: "pending" },
        { id: "2.2", title: "Wärmepumpe positionieren", type: "photo", status: "pending" },
        { id: "2.3", title: "Rohrleitungen anschließen", type: "text", status: "pending" },
        { id: "2.4", title: "Dichtheitsprüfung durchführen", type: "select", options: ["Bestanden", "Nicht bestanden", "Nacharbeit erforderlich"], status: "pending" }
      ]
    },
    {
      id: "3",
      title: "Elektrische Anschlüsse",
      status: "pending",
      subTasks: [
        { id: "3.1", title: "Stromversorgung prüfen", type: "checkbox", status: "pending" },
        { id: "3.2", title: "Kabel verlegen", type: "photo", status: "pending" },
        { id: "3.3", title: "Anschlüsse dokumentieren", type: "text", status: "pending" }
      ]
    },
    {
      id: "4",
      title: "Endabnahme",
      status: "pending",
      subTasks: [
        { id: "4.1", title: "Funktionstest durchführen", type: "select", options: ["Erfolgreich", "Fehlgeschlagen", "Teilweise erfolgreich"], status: "pending" },
        { id: "4.2", title: "Einweisung Kunde", type: "checkbox", status: "pending" },
        { id: "4.3", title: "Abschlussdokumentation", type: "photo", status: "pending" }
      ]
    }
  ] as Task[]
}

type TabType = "customer" | "project" | "documents"

interface SubTaskFormData {
  taskId: string
  subTaskId: string
  type: "checkbox" | "photo" | "text" | "select"
  value: string
  notes: string
}

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("customer")
  const [expandedTask, setExpandedTask] = useState<string | null>(null)

  const toggleTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  return (
    <div className="flex flex-col h-full">
      {/* App Bar */}
      <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/mobile" className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            {projectData.id}
          </span>
        </div>
        <Cloud className="w-5 h-5 text-green-500" />
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
          <div className="bg-white rounded-xl shadow-sm divide-y">
            <div className="p-4">
              <h3 className="font-medium flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FEDC00]" />
                Aufgaben
              </h3>
            </div>
            {projectData.tasks.map((task) => (
              <div key={task.id}>
                <button
                  onClick={() => toggleTask(task.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle 
                      className={`w-5 h-5 ${
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
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedTask === task.id ? 'rotate-90' : ''}`} />
                </button>
                {expandedTask === task.id && (
                  <div className="bg-gray-50 px-4 py-2">
                    <div className="space-y-2">
                      {task.subTasks.map((subTask) => (
                        <Link
                          key={subTask.id}
                          href={`/mobile/projects/${projectData.id}/sub-job/${subTask.id}`}
                          className="w-full flex items-center justify-between p-2 rounded-lg bg-white hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle 
                              className={`w-4 h-4 ${
                                subTask.status === 'completed' 
                                  ? 'text-green-500' 
                                  : 'text-gray-300'
                              }`} 
                            />
                            <span className={
                              subTask.status === 'completed' 
                                ? 'line-through text-gray-500' 
                                : 'text-gray-900'
                            }>
                              {subTask.title}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  )
} 