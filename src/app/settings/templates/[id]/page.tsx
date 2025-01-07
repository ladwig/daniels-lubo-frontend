'use client'

import { useState, useEffect } from "react"
import { use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Plus, GripVertical, X } from "lucide-react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"

type AnswerType = "text" | "boolean" | "select" | "number" | "image"
type TemplateType = "project" | "job"
type ProjectType = "heat_pump" | "pv_system"

interface FormField {
  id: string
  question: string
  answerType: AnswerType
  required: boolean
  options?: string[]
}

interface Template {
  id: string
  name: string
  type: TemplateType
  projectType?: ProjectType
  relatedProjectTypes?: ProjectType[]
  fields: FormField[]
}

const mockTemplates: Record<string, Template> = {
  "t1": {
    id: "t1",
    name: "Standard Wärmepumpen-Installation",
    type: "project",
    projectType: "heat_pump",
    fields: [
      {
        id: "f1",
        question: "Gebäudetyp",
        answerType: "select",
        required: true,
        options: ["Einfamilienhaus", "Mehrfamilienhaus", "Gewerbe"]
      },
      {
        id: "f2",
        question: "Baujahr",
        answerType: "number",
        required: true
      },
      {
        id: "f3",
        question: "Vorhandenes Heizsystem",
        answerType: "text",
        required: true
      }
    ]
  },
  "t2": {
    id: "t2",
    name: "Wartungsauftrag",
    type: "job",
    relatedProjectTypes: ["heat_pump"],
    fields: [
      {
        id: "f4",
        question: "Letzte Wartung",
        answerType: "text",
        required: true
      },
      {
        id: "f5",
        question: "Fotos der Anlage",
        answerType: "image",
        required: false
      }
    ]
  }
}

const answerTypeConfig: Record<AnswerType, { label: string; icon: React.ReactNode }> = {
  text: { 
    label: "Text",
    icon: <span className="text-xs">Aa</span>
  },
  boolean: {
    label: "Ja/Nein",
    icon: <span className="text-xs">✓</span>
  },
  select: {
    label: "Auswahl",
    icon: <span className="text-xs">▼</span>
  },
  number: {
    label: "Nummer",
    icon: <span className="text-xs">123</span>
  },
  image: {
    label: "Bild",
    icon: <span className="text-xs">📷</span>
  }
}

interface PageParams {
  id: string
}

export default function TemplateBuilderPage({ params }: { params: Promise<PageParams> }) {
  const { id } = use(params)
  const [fields, setFields] = useState<FormField[]>([])
  const [templateName, setTemplateName] = useState("")
  const [templateType, setTemplateType] = useState<TemplateType>("project")
  const [projectType, setProjectType] = useState<ProjectType | undefined>()
  const [relatedProjectTypes, setRelatedProjectTypes] = useState<ProjectType[]>([])

  // Load template data if editing
  useEffect(() => {
    if (id !== "new" && mockTemplates[id]) {
      const template = mockTemplates[id]
      setTemplateName(template.name)
      setTemplateType(template.type)
      setProjectType(template.projectType)
      setRelatedProjectTypes(template.relatedProjectTypes || [])
      setFields(template.fields)
    }
  }, [id])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(fields)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFields(items)
  }

  const addField = () => {
    const newField: FormField = {
      id: `f${Date.now()}`,
      question: "Neue Frage",
      answerType: "text",
      required: false
    }

    setFields([...fields, newField])
  }

  const removeField = (fieldId: string) => {
    setFields(fields.filter(f => f.id !== fieldId))
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFields(fields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    ))
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/settings">Einstellungen</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/settings/templates">Vorlagen</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {id === "new" ? "Neue Vorlage" : templateName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {id === "new" ? "Neue Vorlage" : templateName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Formularfelder definieren und anordnen
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Abbrechen</Button>
          <Button>Speichern</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Vorlagenname</label>
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Name der Vorlage eingeben..."
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Vorlagentyp</label>
              <Select value={templateType} onValueChange={(value: TemplateType) => setTemplateType(value)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Typ auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">Projekt</SelectItem>
                  <SelectItem value="job">Auftrag</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {templateType === "project" && (
              <div>
                <label className="text-sm font-medium">Projekttyp</label>
                <Select value={projectType} onValueChange={(value: ProjectType) => setProjectType(value)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Projekttyp auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heat_pump">Wärmepumpe</SelectItem>
                    <SelectItem value="pv_system">PV-System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {templateType === "job" && (
              <div>
                <label className="text-sm font-medium">Zugehörige Projekttypen</label>
                <Select
                  value={relatedProjectTypes[0]}
                  onValueChange={(value: ProjectType) => setRelatedProjectTypes([value])}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Projekttyp auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heat_pump">Wärmepumpe</SelectItem>
                    <SelectItem value="pv_system">PV-System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-6 border-t">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Formularfelder</h3>
              <Button onClick={addField} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Feld hinzufügen
              </Button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="fields">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {fields.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="text-muted-foreground"
                            >
                              <GripVertical className="h-5 w-5" />
                            </div>
                            
                            <div className="flex-1 grid gap-4">
                              <Input
                                value={field.question}
                                onChange={(e) =>
                                  updateField(field.id, { question: e.target.value })
                                }
                                placeholder="Frage eingeben..."
                              />
                              <div className="flex items-center gap-2">
                                {Object.entries(answerTypeConfig).map(([type, config]) => (
                                  <Button
                                    key={type}
                                    size="sm"
                                    variant={field.answerType === type ? "default" : "outline"}
                                    onClick={() =>
                                      updateField(field.id, { answerType: type as AnswerType })
                                    }
                                  >
                                    {config.icon}
                                    <span className="ml-2">{config.label}</span>
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeField(field.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </Card>
    </div>
  )
} 