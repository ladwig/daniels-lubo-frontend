"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for projects
const projects = [
  {
    id: "PRJ001",
    customer: {
      name: "John Doe",
      location: "Berlin",
    },
    partner: {
      name: "1Komma5",
    },
    status: "in_progress",
  },
  {
    id: "PRJ002",
    customer: {
      name: "Jane Smith",
      location: "Hamburg",
    },
    partner: {
      name: "42Watt",
    },
    status: "pending",
  },
  {
    id: "PRJ003",
    customer: {
      name: "Mike Johnson",
      location: "Munich",
    },
    partner: {
      name: "Montamo",
    },
    status: "completed",
  },
]

// Get unique locations from projects
const locations = [...new Set(projects.map(project => project.customer.location))].sort()

// Mock data for KPIs
const kpis = {
  openInstallations: 15,
  doneInstallations: 45,
  openReworks: 3,
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [partnerFilter, setPartnerFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredProjects = projects.filter(project => {
    const matchesSearch = (
      project.id.toLowerCase().includes(search.toLowerCase()) ||
      project.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      project.customer.location.toLowerCase().includes(search.toLowerCase()) ||
      project.partner.name.toLowerCase().includes(search.toLowerCase())
    )
    const matchesPartner = partnerFilter === "all" || project.partner.name === partnerFilter
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesLocation = locationFilter === "all" || project.customer.location === locationFilter

    return matchesSearch && matchesPartner && matchesStatus && matchesLocation
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projekte</h1>
        <p className="text-sm text-muted-foreground">
          Wärmepumpen-Installationsprojekte verwalten
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Offene Installationen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.openInstallations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Abgeschlossene Installationen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.doneInstallations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Offene Nacharbeiten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.openReworks}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Projekte, Kunden oder Standorte suchen..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Select value={partnerFilter} onValueChange={setPartnerFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Nach Partner filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Partner</SelectItem>
              <SelectItem value="1Komma5">1Komma5</SelectItem>
              <SelectItem value="42Watt">42Watt</SelectItem>
              <SelectItem value="Montamo">Montamo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Nach Standort filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Standorte</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Nach Status filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="pending">Ausstehend</SelectItem>
              <SelectItem value="in_progress">In Bearbeitung</SelectItem>
              <SelectItem value="completed">Abgeschlossen</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Neues Projekt
          </Button>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projekt ID</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Kunde</TableHead>
              <TableHead>Standort</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/projects/${project.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {project.id}
                  </Link>
                </TableCell>
                <TableCell>{project.partner.name}</TableCell>
                <TableCell>{project.customer.name}</TableCell>
                <TableCell>{project.customer.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === "completed"
                        ? "default"
                        : project.status === "in_progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {project.status === "completed" ? "Abgeschlossen" : 
                     project.status === "in_progress" ? "In Bearbeitung" : 
                     "Ausstehend"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
} 