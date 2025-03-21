"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Cloud, Camera, CheckCircle, Menu, X } from "lucide-react"
import { NavigationBar } from "@/components/mobile/navigation-bar"
import { TasksOverviewSheet } from "@/components/mobile/tasks-overview-sheet"

interface Question {
  id: string
  text: string
  type: "photo" | "text" | "select" | "checkbox"
  options?: string[]
  required: boolean
}

interface SubJob {
  id: string
  title: string
  description: string
  status: "completed" | "pending"
  questions: Question[]
}

interface Answer {
  questionId: string
  value: string
}

interface Task {
  id: string
  title: string
  status: "completed" | "pending"
  subTasks: {
    id: string
    title: string
    status: "completed" | "pending"
  }[]
}

// Mock data - In real app, this would be fetched based on the subId
const subJobData: SubJob = {
  id: "2.1",
  title: "Fundament prüfen",
  description: "Überprüfung des Fundaments auf Stabilität und korrekte Maße",
  status: "pending",
  questions: [
    {
      id: "q1",
      text: "Sind die Fundamentmaße korrekt?",
      type: "select",
      options: ["Ja", "Nein", "Nacharbeit erforderlich"],
      required: true
    },
    {
      id: "q2",
      text: "Dokumentiere die Fundamentmaße mit einem Foto",
      type: "photo",
      required: true
    },
    {
      id: "q3",
      text: "Beschreibe den Zustand des Fundaments",
      type: "text",
      required: true
    },
    {
      id: "q4",
      text: "Wasserwaage angelegt?",
      type: "checkbox",
      required: true
    },
    {
      id: "q5",
      text: "Zusätzliche Anmerkungen",
      type: "text",
      required: false
    }
  ]
}

// Mock data for all tasks (in real app, this would be fetched)
const allTasks: Task[] = [
  {
    id: "1",
    title: "Vorbereitung der Baustelle",
    status: "completed" as const,
    subTasks: [
      { id: "1.1", title: "Arbeitsbereich absichern", status: "completed" as const },
      { id: "1.2", title: "Werkzeuge und Material prüfen", status: "completed" as const },
      { id: "1.3", title: "Fotodokumentation Ausgangszustand", status: "completed" as const }
    ]
  },
  {
    id: "2",
    title: "Installation der Wärmepumpe",
    status: "pending" as const,
    subTasks: [
      { id: "2.1", title: "Fundament prüfen", status: "pending" as const },
      { id: "2.2", title: "Wärmepumpe positionieren", status: "pending" as const },
      { id: "2.3", title: "Rohrleitungen anschließen", status: "pending" as const },
      { id: "2.4", title: "Dichtheitsprüfung durchführen", status: "pending" as const }
    ]
  },
  {
    id: "3",
    title: "Elektrische Anschlüsse",
    status: "pending" as const,
    subTasks: [
      { id: "3.1", title: "Stromversorgung prüfen", status: "pending" as const },
      { id: "3.2", title: "Kabel verlegen", status: "pending" as const },
      { id: "3.3", title: "Anschlüsse dokumentieren", status: "pending" as const }
    ]
  }
]

export default function SubJobPage() {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isTasksVisible, setIsTasksVisible] = useState(false)

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId)
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, value } : a)
      }
      return [...prev, { questionId, value }]
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission
    console.log(answers)
    // Find next task and navigate to it
    const currentTaskId = subJobData.id
    let foundCurrent = false
    let nextTaskId = null

    for (const task of allTasks) {
      for (const subTask of task.subTasks) {
        if (foundCurrent && subTask.status === "pending") {
          nextTaskId = subTask.id
          break
        }
        if (subTask.id === currentTaskId) {
          foundCurrent = true
        }
      }
      if (nextTaskId) break
    }

    if (nextTaskId) {
      window.location.href = `/mobile/projects/PRJ001/sub-job/${nextTaskId}`
    }
  }

  const getAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.value || ""
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white">
      {/* App Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href=".." className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-gray-900 text-lg font-medium">
            {subJobData.title}
          </span>
        </div>
        <button
          onClick={() => setIsTasksVisible(true)}
          className="text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <p className="text-gray-600 mb-6">{subJobData.description}</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {subJobData.questions.map((question) => (
              <div key={question.id} className="bg-white rounded-xl p-4 shadow-sm">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  {question.text}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {question.type === 'photo' && (
                  <button
                    type="button"
                    onClick={() => handleAnswerChange(question.id, 'photo_placeholder')}
                    className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <Camera className="w-8 h-8 text-gray-400" />
                  </button>
                )}

                {question.type === 'text' && (
                  <textarea
                    value={getAnswer(question.id)}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="w-full border rounded-lg p-2 h-32"
                    placeholder="Deine Antwort..."
                    required={question.required}
                  />
                )}

                {question.type === 'select' && (
                  <select
                    value={getAnswer(question.id)}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="w-full border rounded-lg p-2"
                    required={question.required}
                  >
                    <option value="">Bitte wählen...</option>
                    {question.options?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}

                {question.type === 'checkbox' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={question.id}
                      checked={getAnswer(question.id) === 'true'}
                      onChange={(e) => handleAnswerChange(question.id, e.target.checked.toString())}
                      className="rounded border-gray-300"
                      required={question.required}
                    />
                    <label htmlFor={question.id} className="text-sm text-gray-700">
                      Bestätigen
                    </label>
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#FEDC00] text-white py-3 rounded-lg font-medium hover:bg-[#E5C700] active:bg-[#D1B600] sticky bottom-4"
            >
              Speichern & weiter
            </button>
          </form>
        </div>
      </div>

      {/* Tasks Overview Sheet */}
      {isTasksVisible && (
        <TasksOverviewSheet
          tasks={allTasks}
          projectId="PRJ001"
          onClose={() => setIsTasksVisible(false)}
        />
      )}

      <NavigationBar />
    </div>
  )
} 