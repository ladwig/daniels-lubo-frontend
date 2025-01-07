'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  type: "project" | "job"
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  usageCount: number
  fields: any[]
}

// Mock data for templates
const mockTemplates: Template[] = [
  {
    id: "t1",
    name: "Standard Wärmepumpen-Installation",
    type: "project",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-05",
    createdBy: "Max Mustermann",
    updatedBy: "Lisa Weber",
    usageCount: 15,
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
  {
    id: "t2",
    name: "Wartungsauftrag",
    type: "job",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
    createdBy: "Jan Becker",
    updatedBy: "Jan Becker",
    usageCount: 8,
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
  },
  {
    id: "t3",
    name: "Kundenbefragung",
    type: "project",
    createdAt: "2024-01-04",
    updatedAt: "2024-01-06",
    createdBy: "Lisa Weber",
    updatedBy: "Max Mustermann",
    usageCount: 5,
    fields: [
      {
        id: "f6",
        question: "Zufriedenheit",
        answerType: "select",
        required: true,
        options: ["Sehr zufrieden", "Zufrieden", "Unzufrieden"]
      }
    ]
  }
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Vorlagen</h1>
          <p className="text-sm text-muted-foreground">
            Projekt- und Auftragsvorlagen verwalten
          </p>
        </div>
        <Link href="/settings/templates/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neue Vorlage
          </Button>
        </Link>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Felder</TableHead>
              <TableHead>Verwendungen</TableHead>
              <TableHead>Erstellt am</TableHead>
              <TableHead>Erstellt von</TableHead>
              <TableHead>Letzte Änderung</TableHead>
              <TableHead>Geändert von</TableHead>
              <TableHead className="w-[50px]">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">
                  {template.name}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {template.type === "project" ? "Projekt" : "Auftrag"}
                  </Badge>
                </TableCell>
                <TableCell>{template.fields.length}</TableCell>
                <TableCell>{template.usageCount}</TableCell>
                <TableCell>{template.createdAt}</TableCell>
                <TableCell>{template.createdBy}</TableCell>
                <TableCell>{template.updatedAt}</TableCell>
                <TableCell>{template.updatedBy}</TableCell>
                <TableCell>
                  <Link href={`/settings/templates/${template.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
} 