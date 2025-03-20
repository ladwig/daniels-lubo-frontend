"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, CheckCircle, List, Smartphone } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"

// Add these type definitions at the top of the file after imports
interface BaseTask {
  id: string
  title: string
  status: "completed" | "pending"
}

interface CheckboxTask extends BaseTask {
  type: "checkbox"
}

interface PhotoTask extends BaseTask {
  type: "photo"
}

interface SelectTask extends BaseTask {
  type: "select"
  options: readonly string[]
}

interface TextTask extends BaseTask {
  type: "text"
}

type Task = CheckboxTask | PhotoTask | SelectTask | TextTask

// Job steps data (you might want to move this to a shared location)
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

export default function SHKJobPage({ params }: { params: { id: string } }) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [isSingleTaskView, setIsSingleTaskView] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [taskValues, setTaskValues] = useState<Record<string, string>>({})

  // Helper function to get current step's tasks
  const getCurrentStepTasks = () => {
    return jobSteps.find(s => s.id === selectedStep)?.tasks || []
  }

  // Helper function to get current task
  const getCurrentTask = () => {
    const tasks = getCurrentStepTasks()
    return tasks[currentTaskIndex]
  }

  // Helper function to handle task completion
  const handleTaskValue = (taskId: string, value: string) => {
    setTaskValues(prev => ({
      ...prev,
      [taskId]: value
    }))
  }

  // Helper function to render a single task
  const renderTask = (task: Task) => {
    const value = taskValues[task.id] || ""

    switch (task.type) {
      case 'checkbox':
        return (
          <button
            onClick={() => handleTaskValue(task.id, value === 'completed' ? '' : 'completed')}
            className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center gap-3"
          >
            {value === 'completed' ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
            )}
            <span>{task.title}</span>
          </button>
        )
      case 'select':
        return (
          <div className="space-y-3">
            {task.options.map((option) => (
              <button
                key={option}
                onClick={() => handleTaskValue(task.id, option)}
                className={`w-full bg-white rounded-lg p-4 shadow-sm border flex items-center gap-3 ${
                  value === option ? 'border-[#FEDC00]' : ''
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  value === option ? 'border-[#FEDC00]' : 'border-gray-300'
                }`}>
                  {value === option && (
                    <div className="w-3 h-3 rounded-full bg-[#FEDC00]" />
                  )}
                </div>
                <span>{option}</span>
              </button>
            ))}
          </div>
        )
      case 'photo':
        return (
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500">Foto aufnehmen</span>
              </div>
            </div>
          </div>
        )
      case 'text':
        return (
          <textarea
            value={value}
            onChange={(e) => handleTaskValue(task.id, e.target.value)}
            placeholder="Notizen eingeben..."
            className="w-full h-40 bg-white rounded-lg p-4 shadow-sm border"
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {selectedStep ? (
            <button
              onClick={() => {
                setSelectedStep(null)
                setIsSingleTaskView(false)
                setCurrentTaskIndex(0)
              }}
              className="text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : (
            <Link
              href={`/mobile/projects/${params.id}`}
              className="text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
          )}
          <span className="text-gray-900 text-lg font-medium">
            {selectedStep ? jobSteps.find(s => s.id === selectedStep)?.title : 'SHK Installation'}
          </span>
        </div>
        {selectedStep && (
          <button
            onClick={() => {
              setIsSingleTaskView(!isSingleTaskView)
              setCurrentTaskIndex(0)
            }}
            className="text-gray-600"
          >
            {isSingleTaskView ? (
              <List className="w-5 h-5" />
            ) : (
              <Smartphone className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {!selectedStep ? (
          // Job Steps Overview
          <div className="p-4">
            <div className="space-y-3">
              {jobSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className="w-full bg-white rounded-lg p-4 shadow-sm border hover:border-[#FEDC00] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'in_progress' ? 'bg-[#FEDC00]' :
                        'bg-gray-300'
                      }`} />
                      <span className="font-medium">{step.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {step.tasks.filter(t => t.status === 'completed').length}/{step.tasks.length}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : isSingleTaskView ? (
          // Single Task Per Screen View
          <div className="p-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  Aufgabe {currentTaskIndex + 1} von {getCurrentStepTasks().length}
                </span>
                <span className="text-sm font-medium">
                  {getCurrentTask()?.title}
                </span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-[#FEDC00] rounded-full transition-all"
                  style={{ width: `${((currentTaskIndex + 1) / getCurrentStepTasks().length) * 100}%` }}
                />
              </div>
            </div>
            {renderTask(getCurrentTask())}
          </div>
        ) : (
          // Full List View
          <div className="p-4">
            <div className="space-y-6">
              {getCurrentStepTasks().map((task) => (
                <div key={task.id} className="space-y-2">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  {renderTask(task)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      {selectedStep && isSingleTaskView && (
        <div className="border-t bg-white p-4">
          <button
            onClick={() => {
              const tasks = getCurrentStepTasks()
              if (currentTaskIndex < tasks.length - 1) {
                setCurrentTaskIndex(currentTaskIndex + 1)
              } else {
                // Last task completed
                setIsSingleTaskView(false)
              }
            }}
            className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600]"
          >
            {currentTaskIndex < getCurrentStepTasks().length - 1 ? 'Weiter' : 'Abschließen'}
          </button>
        </div>
      )}

      <NavigationBar />
    </div>
  )
} 