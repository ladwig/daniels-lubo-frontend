"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, X, ChevronRight, ChevronLeft } from "lucide-react"

interface SubTask {
  id: string
  title: string
  status: "completed" | "pending"
}

interface Task {
  id: string
  title: string
  status: "completed" | "pending"
  subTasks: SubTask[]
}

interface TasksOverviewSheetProps {
  tasks: Task[]
  projectId: string
  onClose: () => void
}

export function TasksOverviewSheet({ tasks, projectId, onClose }: TasksOverviewSheetProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null)

  const toggleTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  const completedTasks = tasks.reduce((acc, task) => acc + task.subTasks.filter(st => st.status === "completed").length, 0)
  const totalTasks = tasks.reduce((acc, task) => acc + task.subTasks.length, 0)

  return (
    <>
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-x-0 top-14 bottom-0 bg-white rounded-t-xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#FEDC00]" />
            <div className="flex items-center gap-2">
              <span>Aufgaben</span>
              <span className="text-sm text-gray-500">{completedTasks}/{totalTasks}</span>
            </div>
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="divide-y overflow-auto h-[calc(100%-57px)]">
          {tasks.map((task) => (
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
                        href={`/mobile/projects/${projectId}/sub-job/${subTask.id}`}
                        className="w-full flex items-center justify-between p-2 rounded-lg bg-white hover:bg-gray-100"
                        onClick={onClose}
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
    </>
  )
} 