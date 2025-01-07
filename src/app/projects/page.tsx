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

type ProjectStatus = "pending" | "in_progress" | "completed" | "on_hold" | "cancelled"

const statusConfig: Record<ProjectStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" }> = {
  pending: { label: "Ausstehend", variant: "secondary" },
  in_progress: { label: "In Bearbeitung", variant: "default" },
  completed: { label: "Abgeschlossen", variant: "success" },
  on_hold: { label: "Pausiert", variant: "outline" },
  cancelled: { label: "Storniert", variant: "destructive" },
}

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
    status: "in_progress" as ProjectStatus,
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
    status: "pending" as ProjectStatus,
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
    status: "completed" as ProjectStatus,
  },
  {
    id: "PRJ004",
    customer: {
      name: "Anna Weber",
      location: "Cologne",
    },
    partner: {
      name: "1Komma5",
    },
    status: "in_progress" as ProjectStatus,
  },
  {
    id: "PRJ005",
    customer: {
      name: "Thomas Müller",
      location: "Frankfurt",
    },
    partner: {
      name: "42Watt",
    },
    status: "on_hold" as ProjectStatus,
  },
  {
    id: "PRJ006",
    customer: {
      name: "Lisa Schmidt",
      location: "Dresden",
    },
    partner: {
      name: "Montamo",
    },
    status: "completed" as ProjectStatus,
  },
  {
    id: "PRJ007",
    customer: {
      name: "Martin Koch",
      location: "Stuttgart",
    },
    partner: {
      name: "1Komma5",
    },
    status: "cancelled" as ProjectStatus,
  },
  {
    id: "PRJ008",
    customer: {
      name: "Sarah Wagner",
      location: "Düsseldorf",
    },
    partner: {
      name: "42Watt",
    },
    status: "in_progress" as ProjectStatus,
  },
  {
    id: "PRJ009",
    customer: {
      name: "Peter Bauer",
      location: "Leipzig",
    },
    partner: {
      name: "Montamo",
    },
    status: "pending" as ProjectStatus,
  },
  {
    id: "PRJ010",
    customer: {
      name: "Julia Fischer",
      location: "Hannover",
    },
    partner: {
      name: "1Komma5",
    },
    status: "completed" as ProjectStatus,
  },
  {
    id: "PRJ011",
    customer: {
      name: "Robert Schulz",
      location: "Nuremberg",
    },
    partner: {
      name: "42Watt",
    },
    status: "in_progress" as ProjectStatus,
  },
  {
    id: "PRJ012",
    customer: {
      name: "Maria Hoffmann",
      location: "Bremen",
    },
    partner: {
      name: "Montamo",
    },
    status: "on_hold" as ProjectStatus,
  },
  {
    id: "PRJ013",
    customer: {
      name: "Andreas Klein",
      location: "Essen",
    },
    partner: {
      name: "1Komma5",
    },
    status: "pending" as ProjectStatus,
  },
  {
    id: "PRJ014",
    customer: {
      name: "Sabine Wolf",
      location: "Dortmund",
    },
    partner: {
      name: "42Watt",
    },
    status: "completed" as ProjectStatus,
  },
  {
    id: "PRJ015",
    customer: {
      name: "Christian Meyer",
      location: "Bonn",
    },
    partner: {
      name: "Montamo",
    },
    status: "in_progress" as ProjectStatus,
  },
  {
    id: "PRJ016",
    customer: {
      name: "Katharina Lang",
      location: "Münster",
    },
    partner: {
      name: "1Komma5",
    },
    status: "cancelled" as ProjectStatus,
  },
  {
    id: "PRJ017",
    customer: {
      name: "Daniel Richter",
      location: "Karlsruhe",
    },
    partner: {
      name: "42Watt",
    },
    status: "pending" as ProjectStatus,
  },
  {
    id: "PRJ018",
    customer: {
      name: "Laura Krause",
      location: "Mannheim",
    },
    partner: {
      name: "Montamo",
    },
    status: "completed" as ProjectStatus,
  }
]

// Get unique locations from projects
const locations = Array.from(new Set(projects.map(project => project.customer.location))).sort()

// Mock data for KPIs
const kpiData = {
  openInstallations: {
    weekly: {
      value: 12,
      trend: "up",
      percentage: 20
    },
    monthly: {
      value: 45,
      trend: "up",
      percentage: 15
    }
  },
  completedInstallations: {
    weekly: {
      value: 8,
      trend: "up",
      percentage: 25
    },
    monthly: {
      value: 32,
      trend: "up",
      percentage: 10
    }
  },
  openRework: {
    weekly: {
      value: 3,
      trend: "down",
      percentage: -10
    },
    monthly: {
      value: 15,
      trend: "down",
      percentage: -5
    }
  }
}

type TimeframeType = "weekly" | "monthly"

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [partnerFilter, setPartnerFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [timeframe, setTimeframe] = useState<TimeframeType>("weekly")

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Projekte</h1>
          <p className="text-sm text-muted-foreground">
            Wärmepumpen-Installationsprojekte verwalten
          </p>
        </div>
        <Select value={timeframe} onValueChange={(value: TimeframeType) => setTimeframe(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Zeitraum wählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Diese Woche</SelectItem>
            <SelectItem value="monthly">Dieser Monat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Offene Installationen
            </CardTitle>
            <Badge variant="outline" className="text-xs font-normal">
              {timeframe === "weekly" ? "Diese Woche" : "Dieser Monat"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiData.openInstallations[timeframe].value}
            </div>
            <p className="text-xs text-muted-foreground">
              {kpiData.openInstallations[timeframe].percentage > 0 ? "+" : ""}
              {kpiData.openInstallations[timeframe].percentage}% gegenüber {timeframe === "weekly" ? "Vorwoche" : "Vormonat"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Abgeschlossene Installationen
            </CardTitle>
            <Badge variant="outline" className="text-xs font-normal">
              {timeframe === "weekly" ? "Diese Woche" : "Dieser Monat"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiData.completedInstallations[timeframe].value}
            </div>
            <p className="text-xs text-muted-foreground">
              {kpiData.completedInstallations[timeframe].percentage > 0 ? "+" : ""}
              {kpiData.completedInstallations[timeframe].percentage}% gegenüber {timeframe === "weekly" ? "Vorwoche" : "Vormonat"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Offene Nacharbeiten
            </CardTitle>
            <Badge variant="outline" className="text-xs font-normal">
              {timeframe === "weekly" ? "Diese Woche" : "Dieser Monat"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiData.openRework[timeframe].value}
            </div>
            <p className="text-xs text-muted-foreground">
              {kpiData.openRework[timeframe].percentage > 0 ? "+" : ""}
              {kpiData.openRework[timeframe].percentage}% gegenüber {timeframe === "weekly" ? "Vorwoche" : "Vormonat"}
            </p>
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
              <TableHead>Kunde</TableHead>
              <TableHead>Standort</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-medium hover:underline"
                  >
                    {project.id}
                  </Link>
                </TableCell>
                <TableCell>{project.customer.name}</TableCell>
                <TableCell>{project.customer.location}</TableCell>
                <TableCell>{project.partner.name}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[project.status].variant}>
                    {statusConfig[project.status].label}
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