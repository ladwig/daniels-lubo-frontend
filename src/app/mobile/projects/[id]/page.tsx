"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Phone, FileText, CheckCircle, Wrench, User, ChevronLeft, ChevronRight, MessageCircle, Play, Plus, X } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"
import { TasksOverviewSheet } from "@/components/mobile/tasks-overview-sheet"
import { PDFViewer } from "@/components/mobile/pdf-viewer"

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

// Add predefined materials list at the top after interfaces
const predefinedMaterials = [
  { id: "m1", name: "Kupferrohr 15mm", defaultUnit: "m" },
  { id: "m2", name: "Kupferrohr 18mm", defaultUnit: "m" },
  { id: "m3", name: "Kupferrohr 22mm", defaultUnit: "m" },
  { id: "m4", name: "Kupferrohr 28mm", defaultUnit: "m" },
  { id: "m5", name: "T-Stück 15mm", defaultUnit: "Stk" },
  { id: "m6", name: "T-Stück 18mm", defaultUnit: "Stk" },
  { id: "m7", name: "T-Stück 22mm", defaultUnit: "Stk" },
  { id: "m8", name: "T-Stück 28mm", defaultUnit: "Stk" },
  { id: "m9", name: "Isolierung 15mm", defaultUnit: "m" },
  { id: "m10", name: "Isolierung 18mm", defaultUnit: "m" },
  { id: "m11", name: "Isolierung 22mm", defaultUnit: "m" },
  { id: "m12", name: "Isolierung 28mm", defaultUnit: "m" },
  { id: "m13", name: "Kältemittel R32", defaultUnit: "kg" },
  { id: "m14", name: "Schwingungsdämpfer", defaultUnit: "Stk" },
  { id: "m15", name: "Wandhalterung klein", defaultUnit: "Stk" },
  { id: "m16", name: "Wandhalterung mittel", defaultUnit: "Stk" },
  { id: "m17", name: "Wandhalterung groß", defaultUnit: "Stk" },
  { id: "m18", name: "Kondensatschlauch", defaultUnit: "m" },
  { id: "m19", name: "Wärmeleitpaste", defaultUnit: "Stk" },
  { id: "m20", name: "Kabel NYM-J 3x1.5", defaultUnit: "m" },
  { id: "m21", name: "Kabel NYM-J 3x2.5", defaultUnit: "m" },
  { id: "m22", name: "Kabel NYM-J 5x1.5", defaultUnit: "m" },
  { id: "m23", name: "Kabel NYM-J 5x2.5", defaultUnit: "m" }
] as const

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
    installationDate: "15.02.2024",
    notes: [
      {
        id: "n1",
        author: "Sarah Weber",
        role: "Planerin",
        date: "01.02.2024",
        text: "Bitte beachten: Der Aufstellort muss mind. 3m von der Grundstücksgrenze entfernt sein. Mit Nachbarn abgesprochen."
      },
      {
        id: "n2",
        author: "Michael Schmidt",
        role: "Technischer Zeichner",
        date: "03.02.2024",
        text: "Hydraulische Weiche erforderlich. Zeichnung im Dokumente-Tab hinterlegt."
      },
      {
        id: "n3",
        author: "Lisa Krause",
        role: "Projektleiterin",
        date: "05.02.2024",
        text: "Kunde wünscht zusätzliche Schallschutzmaßnahmen. Budget wurde angepasst."
      }
    ]
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
  ] as Task[],
  materials: [
    {
      taskId: "1", // Vorbereitung der Baustelle
      items: [
        { id: "v1", name: "Absperrband", amount: 50, unit: "m" },
        { id: "v2", name: "Baustellen-Warnschilder", amount: 4, unit: "Stk" },
        { id: "v3", name: "Schutzplane", amount: 20, unit: "m²" },
        { id: "v4", name: "Arbeitshandschuhe", amount: 3, unit: "Stk" }
      ]
    },
    {
      taskId: "2", // Installation der Wärmepumpe
      items: [
        { id: "w1", name: "Kupferrohr 22mm", amount: 15, unit: "m" },
        { id: "w2", name: "T-Stück 22mm", amount: 6, unit: "Stk" },
        { id: "w3", name: "Isolierung 22mm", amount: 15, unit: "m" },
        { id: "w4", name: "Kältemittel R32", amount: 2.5, unit: "kg" },
        { id: "w5", name: "Schwingungsdämpfer", amount: 4, unit: "Stk" },
        { id: "w6", name: "Wandhalterung", amount: 2, unit: "Stk" },
        { id: "w7", name: "Kondensatschlauch", amount: 5, unit: "m" },
        { id: "w8", name: "Wärmeleitpaste", amount: 1, unit: "Stk" }
      ]
    },
    {
      taskId: "3", // Elektrische Anschlüsse
      items: [
        { id: "e1", name: "Kabel NYM-J 5x2.5", amount: 25, unit: "m" },
        { id: "e2", name: "Leitungsschutzschalter", amount: 3, unit: "Stk" },
        { id: "e3", name: "Fehlerstromschutzschalter", amount: 1, unit: "Stk" },
        { id: "e4", name: "Verteilerdose", amount: 2, unit: "Stk" },
        { id: "e5", name: "Kabelbinder", amount: 50, unit: "Stk" },
        { id: "e6", name: "Kabelkanal 40x60mm", amount: 10, unit: "m" },
        { id: "e7", name: "Steckdose AP", amount: 1, unit: "Stk" }
      ]
    },
    {
      taskId: "4", // Endabnahme
      items: [
        { id: "f1", name: "Prüfprotokoll", amount: 1, unit: "Stk" },
        { id: "f2", name: "Bedienungsanleitung", amount: 1, unit: "Stk" },
        { id: "f3", name: "Wartungsplan", amount: 1, unit: "Stk" },
        { id: "f4", name: "Garantiekarte", amount: 1, unit: "Stk" },
        { id: "f5", name: "Reinigungsmittel", amount: 1, unit: "Stk" }
      ]
    }
  ]
} as const

type TabType = "job" | "customer" | "project" | "documents"

interface SubTaskFormData {
  taskId: string
  subTaskId: string
  type: "checkbox" | "photo" | "text" | "select"
  value: string
  notes: string
}

// Mock data for jobs
const jobsData = {
  myJobs: [
    {
      id: "shk1",
      title: "Wärmepumpe Installation",
      type: "SHK",
      status: "pending"
    }
  ],
  allJobs: [
    {
      category: "VOC",
      jobs: [
        {
          id: "voc1",
          title: "Vorbereitung der Baustelle",
          status: "completed"
        }
      ]
    },
    {
      category: "SHK",
      jobs: [
        {
          id: "shk1",
          title: "Wärmepumpe Installation",
          status: "pending"
        },
        {
          id: "shk2",
          title: "Rohrleitungen verlegen",
          status: "pending"
        }
      ]
    },
    {
      category: "Elektro",
      jobs: [
        {
          id: "el1",
          title: "Elektrische Anschlüsse",
          status: "pending"
        }
      ]
    },
    {
      category: "Isolierung",
      jobs: [
        {
          id: "iso1",
          title: "Rohrisolierung",
          status: "pending"
        }
      ]
    }
  ]
}

// Add mock chat messages after the jobsData constant
const mockChatMessages = [
  {
    id: "1",
    user: {
      name: "Sarah Weber",
      role: "Planerin",
      image: "/avatars/sarah.jpg"
    },
    message: "Habe die technischen Zeichnungen aktualisiert. Bitte beachtet die neue Position der Wärmepumpe.",
    timestamp: "Heute, 09:15"
  },
  {
    id: "2",
    user: {
      name: "Michael Schmidt",
      role: "Techniker",
      image: "/avatars/michael.jpg"
    },
    message: "Danke Sarah, ich schaue mir das gleich an. @Daniel, kannst du bitte die Isolierung entsprechend anpassen?",
    timestamp: "Heute, 09:30"
  },
  {
    id: "3",
    user: {
      name: "Daniel Schmidt",
      role: "SHK",
      image: "/avatars/daniel.jpg"
    },
    message: "Klar, mache ich. Brauche aber noch die genauen Maße für die Isolierung.",
    timestamp: "Heute, 09:45"
  },
  {
    id: "4",
    user: {
      name: "Lisa Krause",
      role: "Projektleiterin",
      image: "/avatars/lisa.jpg"
    },
    message: "Super, dass ihr das direkt klärt. Ich habe den Kunden informiert, dass wir morgen mit der Installation beginnen.",
    timestamp: "Heute, 10:00"
  }
] as const

// Add this after the mockChatMessages constant
const jobSteps = [
  {
    id: "1",
    title: "Vorbereitung",
    status: "completed",
    tasks: [
      { id: "1.1", title: "Arbeitsbereich absichern", type: "checkbox", status: "completed" },
      { id: "1.2", title: "Werkzeuge und Material prüfen", type: "checkbox", status: "completed" },
      { id: "1.3", title: "Fotodokumentation Ausgangszustand", type: "photo", status: "completed" }
    ]
  },
  {
    id: "2",
    title: "Installation",
    status: "in_progress",
    tasks: [
      { id: "2.1", title: "Fundament prüfen", type: "checkbox", status: "pending" },
      { id: "2.2", title: "Wärmepumpe positionieren", type: "photo", status: "pending" },
      { id: "2.3", title: "Rohrleitungen anschließen", type: "text", status: "pending" }
    ]
  },
  {
    id: "3",
    title: "Prüfung",
    status: "pending",
    tasks: [
      { id: "3.1", title: "Dichtheitsprüfung", type: "select", options: ["Bestanden", "Nicht bestanden"], status: "pending" },
      { id: "3.2", title: "Drucktest", type: "select", options: ["Bestanden", "Nicht bestanden"], status: "pending" }
    ]
  },
  {
    id: "4",
    title: "Abnahme",
    status: "pending",
    tasks: [
      { id: "4.1", title: "Funktionstest", type: "select", options: ["Erfolgreich", "Fehlgeschlagen"], status: "pending" },
      { id: "4.2", title: "Einweisung Kunde", type: "checkbox", status: "pending" },
      { id: "4.3", title: "Abschlussdokumentation", type: "photo", status: "pending" }
    ]
  }
] as const

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("job")
  const [isTasksVisible, setIsTasksVisible] = useState(false)
  const [hasStartedJob, setHasStartedJob] = useState(false)
  const [showAddItemForm, setShowAddItemForm] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [newItem, setNewItem] = useState({ taskId: "", materialId: "", name: "", amount: "", unit: "" })
  const [editingItem, setEditingItem] = useState<null | { id: string, taskId: string, materialId: string, name: string, amount: number, unit: string }>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<null | typeof projectData.documents[number]>(null)
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  // Initialize hasStartedJob from localStorage after mount
  useEffect(() => {
    const stored = window.localStorage.getItem(`job_started_${projectData.id}`)
    setHasStartedJob(stored === 'true')
  }, [])

  // Initialize isCheckedIn from localStorage after mount
  useEffect(() => {
    const stored = window.localStorage.getItem(`checkedIn_${projectData.id}`)
    setIsCheckedIn(stored === 'true')
  }, [])

  const handleJobStart = () => {
    const firstIncompleteTask = projectData.tasks.find(t => t.status === 'pending')
    if (firstIncompleteTask && firstIncompleteTask.subTasks.length > 0) {
      // Store that we've started this job
      window.localStorage.setItem(`job_started_${projectData.id}`, 'true')
      setHasStartedJob(true)
      window.location.href = `/mobile/projects/${projectData.id}/sub-job/${firstIncompleteTask.subTasks[0].id}`
    }
  }

  const handleCheckIn = () => {
    window.localStorage.setItem(`checkedIn_${projectData.id}`, 'true')
    setIsCheckedIn(true)
  }

  const handleCheckOut = () => {
    window.localStorage.removeItem(`checkedIn_${projectData.id}`)
    setIsCheckedIn(false)
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.materialId || !newItem.amount) return // Basic validation
    
    // Here you would normally add the item to your backend
    // For now we'll just close the form
    setShowAddItemForm(false)
    setNewItem({ taskId: "", materialId: "", name: "", amount: "", unit: "" })
    setEditingItem(null)
  }

  const handleEditClick = (taskId: string, item: { id: string, name: string, amount: number, unit: string }) => {
    // Find the material in predefinedMaterials to get its ID
    const material = predefinedMaterials.find(m => m.name === item.name)
    setEditingItem({
      ...item,
      taskId,
      materialId: material?.id || 'm1' // Fallback to m1 if not found
    })
    setShowAddItemForm(true)
  }

  // Add a function to handle material selection
  const handleMaterialSelect = (material: typeof predefinedMaterials[number]) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        materialId: material.id,
        name: material.name,
        unit: material.defaultUnit
      })
    } else {
      setNewItem({
        ...newItem,
        materialId: material.id,
        name: material.name,
        unit: material.defaultUnit
      })
    }
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white relative">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/mobile" className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            {projectData.id}
          </span>
        </div>
        <button 
          onClick={() => setShowChat(true)}
          className="text-[#FEDC00] hover:text-[#E5C700] active:text-[#D1B600]"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-gray-50 px-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab("job")}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "job"
                ? "border-[#FEDC00] text-gray-900"
                : "border-transparent text-gray-600"
            }`}
          >
            Job
          </button>
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
          {/* Job Tab */}
          {activeTab === "job" && (
            <div>
              {!isCheckedIn ? (
                <div className="p-4">
                  <p className="text-sm text-gray-500 text-center">
                    Bitte melden Sie sich an, um mit der Arbeit zu beginnen.
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {/* User's Job */}
                  <div className="p-4">
                    <h2 className="text-sm font-medium text-gray-500 mb-3">Mein Job</h2>
                    <Link
                      href={`/mobile/projects/${projectData.id}/jobs/shk`}
                      className="block bg-white rounded-lg p-4 shadow-sm border-2 border-[#FEDC00]"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">SHK</span>
                          <p className="text-sm text-gray-500 mt-1">Wärmepumpe Installation</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </Link>
                  </div>

                  {/* Other Project Jobs */}
                  <div className="p-4">
                    <h2 className="text-sm font-medium text-gray-500 mb-3">Weitere Jobs im Projekt</h2>
                    <div className="space-y-2 opacity-75">
                      {["VOC", "Elektro", "Isolierung"].map((category) => (
                        <div
                          key={category}
                          className="block bg-white rounded-lg p-4 shadow-sm"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Customer Tab */}
          {activeTab === "customer" && (
            <div className="divide-y">
              <div className="p-4">
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-3 text-[#FEDC00]" />
                  <span className="text-sm">{projectData.customer.contactPerson}</span>
                </div>
                <div className="space-y-3 mt-3">
                  <button 
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(projectData.customer.address)}`, '_blank')}
                    className="w-full flex items-center text-gray-600 active:bg-gray-50 rounded-lg py-1 hover:underline decoration-[#FEDC00] decoration-2"
                  >
                    <MapPin className="w-5 h-5 mr-3 text-[#FEDC00] flex-shrink-0" />
                    <span className="text-sm text-left">{projectData.customer.address}</span>
                  </button>
                  <button 
                    onClick={() => window.location.href = `tel:${projectData.customer.phone}`}
                    className="w-full flex items-center text-gray-600 active:bg-gray-50 rounded-lg py-1 hover:underline decoration-[#FEDC00] decoration-2"
                  >
                    <Phone className="w-5 h-5 mr-3 text-[#FEDC00] flex-shrink-0" />
                    <span className="text-sm text-left">{projectData.customer.phone}</span>
                  </button>
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

              {/* Planning Notes Section */}
              <div className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FEDC00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Planungsnotizen
                </h3>
                <div className="space-y-4">
                  {projectData.system.notes.map(note => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{note.author}</span>
                          <span className="text-xs text-gray-500 ml-2">({note.role})</span>
                        </div>
                        <span className="text-xs text-gray-500">{note.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="divide-y">
              {projectData.documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className="w-full p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-[#FEDC00] mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-gray-500">{doc.date}</div>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {doc.type}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Item Form */}
      {showAddItemForm && (
        <div className="absolute inset-0 bg-white z-20">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-medium">{editingItem ? 'Material bearbeiten' : 'Material hinzufügen'}</h3>
            <button 
              onClick={() => {
                setShowAddItemForm(false)
                setEditingItem(null)
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleAddItem} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arbeitsschritt
              </label>
              <select
                value={editingItem?.taskId || newItem.taskId}
                onChange={e => editingItem 
                  ? setEditingItem({...editingItem, taskId: e.target.value})
                  : setNewItem({...newItem, taskId: e.target.value})
                }
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="">Bitte wählen...</option>
                {projectData.tasks.map(task => (
                  <option key={task.id} value={task.id}>{task.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery || (editingItem?.name || newItem.name) || ''}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true)
                    if (!searchQuery && (editingItem?.name || newItem.name)) {
                      setSearchQuery('')
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsSearchFocused(false)
                    }, 200)
                  }}
                  className="w-full border rounded-lg p-2 pr-8"
                  placeholder="Material suchen..."
                />
                {(searchQuery || editingItem?.name || newItem.name) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      if (editingItem) {
                        setEditingItem({...editingItem, name: '', materialId: '', unit: ''})
                      } else {
                        setNewItem({...newItem, name: '', materialId: '', unit: ''})
                      }
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {isSearchFocused && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {predefinedMaterials
                      .filter(m => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(material => (
                        <button
                          key={material.id}
                          onClick={() => {
                            handleMaterialSelect(material)
                            setSearchQuery(material.name)
                            setIsSearchFocused(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                        >
                          {/* Material Image Skeleton */}
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                            <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200"></div>
                          </div>
                          <div className="flex-1 flex items-center justify-between min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              {material.name === (editingItem?.name || newItem.name) && (
                                <svg className="w-4 h-4 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                              <div className="truncate">
                                <span className="text-sm text-gray-900">{material.name}</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 flex-shrink-0">{material.defaultUnit}</span>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menge
              </label>
              <div className="relative rounded-lg border overflow-hidden">
                <input
                  type="number"
                  value={editingItem?.amount || newItem.amount}
                  onChange={e => editingItem
                    ? setEditingItem({...editingItem, amount: Number(e.target.value)})
                    : setNewItem({...newItem, amount: e.target.value})
                  }
                  className="w-full p-2 pr-16"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 bg-gray-50 border-l text-gray-500">
                  {editingItem?.unit || newItem.unit || "---"}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600]"
            >
              {editingItem ? 'Speichern' : 'Hinzufügen'}
            </button>
          </form>
        </div>
      )}

      {/* PDF Viewer */}
      {selectedDocument && (
        <PDFViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}

      {/* Check-in/Check-out Button */}
      {activeTab === "job" && (
        <div className="border-t bg-white p-4">
          {!isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600] flex items-center justify-center gap-2"
            >
              <span>Check-in</span>
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center gap-2"
            >
              <span>Check-out</span>
            </button>
          )}
        </div>
      )}

      {/* Chat Overlay */}
      {showChat && (
        <div className="absolute inset-0 bg-white z-30">
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowChat(false)}
                  className="text-gray-600"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-gray-900 text-lg font-medium">
                  Projekt Chat
                </span>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-auto bg-gray-50 p-4">
              {mockChatMessages.length > 0 ? (
                <div className="space-y-4">
                  {mockChatMessages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      {/* User Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-[#FEDC00] to-[#E5C700] flex items-center justify-center text-white font-medium">
                          {msg.user.name.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Message Content */}
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-sm">{msg.user.name}</span>
                          <span className="text-xs text-gray-500">({msg.user.role})</span>
                          <span className="text-xs text-gray-400 ml-auto">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-4">
                  Noch keine Nachrichten
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t bg-white p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nachricht schreiben..."
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button className="bg-[#FEDC00] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600]">
                  Senden
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <NavigationBar />
    </div>
  )
} 