"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Calendar, List, Plus, Search, MapPin, Pencil } from "lucide-react"
import Link from "next/link"
import { CraftsmanPill } from "@/components/ui/craftsman-pill"
import dynamic from "next/dynamic"
const MapView = dynamic(() => import("@/components/bookings/map-view"), {
  ssr: false,
})

// Mock data for bookings
const bookings = [
  {
    id: "B1",
    date: "2024-02-15 09:00",
    duration: "2 hours",
    projectId: "PRJ001",
    jobId: "J1",
    jobName: "Site Survey",
    type: "standard",
    craftsmen: [
      { id: "C1", name: "Mike Brown", role: "Surveyor" }
    ],
  },
  {
    id: "B2",
    date: "2024-02-20 08:30",
    duration: "6 hours",
    projectId: "PRJ002",
    jobId: "J2",
    jobName: "Ground Work",
    type: "standard",
    craftsmen: [
      { id: "C2", name: "Steve Wilson", role: "Lead Installer" },
      { id: "C3", name: "John Smith", role: "Assistant" }
    ],
  },
  {
    id: "B3",
    date: "2024-02-25 10:00",
    duration: "4 hours",
    projectId: "PRJ001",
    jobId: "J3",
    jobName: "Heat Pump Installation",
    type: "rework",
    craftsmen: [
      { id: "C4", name: "Tom Davis", role: "Lead Installer" },
      { id: "C5", name: "Alex Johnson", role: "Specialist" }
    ],
  },
]

// Mock data for projects
const projects = [
  {
    id: "PRJ001",
    name: "Heat Pump Installation - John Doe",
    jobs: [
      { id: "J1", name: "Site Survey" },
      { id: "J2", name: "Installation" },
    ],
  },
  {
    id: "PRJ002",
    name: "Solar Panel Setup - Jane Smith",
    jobs: [
      { id: "J3", name: "Initial Assessment" },
      { id: "J4", name: "Panel Installation" },
    ],
  },
]

// Mock data for craftsmen
const craftsmen = [
  { id: "C1", name: "Mike Brown" },
  { id: "C2", name: "Steve Wilson" },
  { id: "C3", name: "John Smith" },
  { id: "C4", name: "Tom Davis" },
  { id: "C5", name: "Alex Johnson" },
]

// Mock data for craftsmen locations
const craftsmenLocations = [
  {
    id: "C1",
    name: "Mike Brown",
    role: "Gutachter",
    color: "#FF4136", // Red
    location: { lat: 52.52, lng: 13.405 }, // Berlin
    route: [
      { lat: 52.52, lng: 13.405 }, // Berlin
      { lat: 52.40, lng: 13.20 }, // Potsdam
      { lat: 52.16, lng: 13.49 }, // Königs Wusterhausen
      { lat: 52.36, lng: 13.61 }, // Erkner
      { lat: 52.52, lng: 13.405 }, // Back to Berlin
    ]
  },
  {
    id: "C2",
    name: "Steve Wilson",
    role: "Hauptinstallateur",
    color: "#0074D9", // Blue
    location: { lat: 53.551, lng: 9.993 }, // Hamburg
    route: [
      { lat: 53.551, lng: 9.993 }, // Hamburg
      { lat: 53.86, lng: 10.687 }, // Lübeck
      { lat: 53.543, lng: 10.215 }, // Bergedorf
      { lat: 53.471, lng: 9.898 }, // Harburg
      { lat: 53.551, lng: 9.993 }, // Back to Hamburg
    ]
  },
  {
    id: "C3",
    name: "John Smith",
    role: "Assistent",
    color: "#2ECC40", // Green
    location: { lat: 48.137, lng: 11.576 }, // Munich
    route: [
      { lat: 48.137, lng: 11.576 }, // Munich
      { lat: 48.265, lng: 11.668 }, // Garching
      { lat: 48.155, lng: 11.747 }, // Haar
      { lat: 48.095, lng: 11.524 }, // Solln
      { lat: 48.137, lng: 11.576 }, // Back to Munich
    ]
  },
  {
    id: "C4",
    name: "Tom Davis",
    role: "Hauptinstallateur",
    color: "#B10DC9", // Purple
    location: { lat: 50.937, lng: 6.961 }, // Cologne
    route: [
      { lat: 50.937, lng: 6.961 }, // Cologne
      { lat: 51.227, lng: 6.773 }, // Düsseldorf
      { lat: 51.481, lng: 7.216 }, // Bochum
      { lat: 51.339, lng: 7.017 }, // Wuppertal
      { lat: 50.937, lng: 6.961 }, // Back to Cologne
    ]
  },
  {
    id: "C5",
    name: "Alex Johnson",
    role: "Spezialist",
    color: "#FF851B", // Orange
    location: { lat: 51.339, lng: 12.377 }, // Leipzig
    route: [
      { lat: 51.339, lng: 12.377 }, // Leipzig
      { lat: 51.034, lng: 13.736 }, // Dresden
      { lat: 50.927, lng: 11.586 }, // Erfurt
      { lat: 51.482, lng: 11.969 }, // Halle
      { lat: 51.339, lng: 12.377 }, // Back to Leipzig
    ]
  }
]
// Dynamically import the map component to avoid SSR issues 
const DynamicMapView = dynamic(() => import("@/components/bookings/map-view"), {
  ssr: false,
  loading: () => (
    <Card className="h-[800px] flex items-center justify-center">
      <p className="text-muted-foreground">Lade Karte...</p>
    </Card>
  ),
})

type ViewType = "table" | "calendar" | "map"
type DialogMode = "create" | "edit"

export default function BookingsPage() {
  // View state
  const [view, setView] = useState<ViewType>("table")
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [craftsmanFilter, setCraftsmanFilter] = useState<string>("all")

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<DialogMode>("create")
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null)

  // Form state
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedJob, setSelectedJob] = useState("")
  const [createNewJob, setCreateNewJob] = useState(false)
  const [newJobName, setNewJobName] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedCraftsman, setSelectedCraftsman] = useState("")
  const [notes, setNotes] = useState("")
  const [newJobType, setNewJobType] = useState("standard")

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = (
      booking.projectId.toLowerCase().includes(search.toLowerCase()) ||
      booking.jobName.toLowerCase().includes(search.toLowerCase()) ||
      booking.craftsmen.some(c => c.name.toLowerCase().includes(search.toLowerCase()))
    )
    const matchesType = typeFilter === "all" || booking.type === typeFilter
    const matchesCraftsman = craftsmanFilter === "all" || 
      booking.craftsmen.some(c => c.id === craftsmanFilter)

    return matchesSearch && matchesType && matchesCraftsman
  })

  const handleSubmit = () => {
    if (dialogMode === "create") {
      // Handle creation
      console.log("Creating new booking:", {
        project: selectedProject,
        job: createNewJob ? {
          name: newJobName,
          type: newJobType
        } : selectedJob,
        date: selectedDate,
        time: selectedTime,
        craftsman: selectedCraftsman,
        notes,
      })
    } else {
      // Handle editing
      console.log("Updating booking:", {
        id: editingBookingId,
        project: selectedProject,
        job: createNewJob ? {
          name: newJobName,
          type: newJobType
        } : selectedJob,
        date: selectedDate,
        time: selectedTime,
        craftsman: selectedCraftsman,
        notes,
      })
    }
    
    resetForm()
    setIsDialogOpen(false)
  }

  const resetForm = () => {
    setSelectedProject("")
    setSelectedJob("")
    setCreateNewJob(false)
    setNewJobName("")
    setNewJobType("standard")
    setSelectedDate("")
    setSelectedTime("")
    setSelectedCraftsman("")
    setNotes("")
    setEditingBookingId(null)
    setDialogMode("create")
  }

  const handleEdit = (booking: typeof bookings[0]) => {
    // Set form values based on booking data
    setSelectedProject(booking.projectId)
    setSelectedJob(booking.jobId)
    setCreateNewJob(false)
    setSelectedDate(booking.date.split(" ")[0])
    setSelectedTime(booking.date.split(" ")[1])
    setSelectedCraftsman(booking.craftsmen[0].id) // For simplicity, we'll edit the first craftsman
    setNewJobType(booking.type)
    setEditingBookingId(booking.id)
    setDialogMode("edit")
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Termine</h1>
          <p className="text-sm text-muted-foreground">
            Termine und Handwerker-Zeitpläne verwalten
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
          >
            <List className="h-4 w-4 mr-1" />
            Tabellenansicht
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("calendar")}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Kalenderansicht
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("map")}
          >
            <MapPin className="h-4 w-4 mr-1" />
            Kartenansicht
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Projekte, Aufträge oder Handwerker suchen..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Nach Typ filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Typen</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="rework">Nacharbeit</SelectItem>
            </SelectContent>
          </Select>
          <Select value={craftsmanFilter} onValueChange={setCraftsmanFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Nach Handwerker filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Handwerker</SelectItem>
              {craftsmen.map((craftsman) => (
                <SelectItem key={craftsman.id} value={craftsman.id}>
                  {craftsman.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Neuer Termin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {dialogMode === "create" ? "Neuen Termin erstellen" : "Termin bearbeiten"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Projekt auswählen</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Projekt auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedProject && (
                    <div className="space-y-2">
                      <Label>Auftrag auswählen</Label>
                      <Select
                        value={selectedJob}
                        onValueChange={(value) => {
                          if (value === "new") {
                            setCreateNewJob(true)
                            setSelectedJob("")
                          } else {
                            setCreateNewJob(false)
                            setSelectedJob(value)
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Auftrag auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects
                            .find((p) => p.id === selectedProject)
                            ?.jobs.map((job) => (
                              <SelectItem key={job.id} value={job.id}>
                                {job.name}
                              </SelectItem>
                            ))}
                          <SelectItem value="new">
                            <div className="flex items-center">
                              <Plus className="h-4 w-4 mr-2" />
                              Neuer Auftrag
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {createNewJob && (
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label>Auftragsname</Label>
                            <Input
                              placeholder="Auftragsnamen eingeben"
                              value={newJobName}
                              onChange={(e) => setNewJobName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Auftragstyp</Label>
                            <Select
                              value={newJobType}
                              onValueChange={setNewJobType}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Auftragstyp auswählen" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="rework">Nacharbeit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {(selectedJob || (createNewJob && newJobName)) && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Datum</Label>
                          <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Uhrzeit</Label>
                          <Input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Handwerker zuweisen</Label>
                        <Select value={selectedCraftsman} onValueChange={setSelectedCraftsman}>
                          <SelectTrigger>
                            <SelectValue placeholder="Handwerker auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            {craftsmen.map((craftsman) => (
                              <SelectItem key={craftsman.id} value={craftsman.id}>
                                {craftsman.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Notizen</Label>
                        <Input
                          placeholder="Zusätzliche Notizen hinzufügen"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !selectedProject ||
                      (!selectedJob && (!createNewJob || !newJobName)) ||
                      !selectedDate ||
                      !selectedTime ||
                      !selectedCraftsman
                    }
                  >
                    {dialogMode === "create" ? "Termin erstellen" : "Termin aktualisieren"}
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      {view === "table" ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum & Uhrzeit</TableHead>
                <TableHead>Projekt</TableHead>
                <TableHead>Auftrag</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Handwerker</TableHead>
                <TableHead>Dauer</TableHead>
                <TableHead className="w-[50px]">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium text-sm">
                    {booking.date}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/projects/${booking.projectId}`}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {booking.projectId}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/projects/${booking.projectId}/jobs/${booking.jobId}`}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {booking.jobName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={booking.type === "rework" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {booking.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {booking.craftsmen.map((craftsman) => (
                        <CraftsmanPill
                          key={craftsman.id}
                          id={craftsman.id}
                          name={craftsman.name}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {booking.duration}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(booking)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : view === "calendar" ? (
        <Card className="p-6">
          <div className="h-[800px] grid grid-cols-[200px_1fr]">
            <div className="border-r pr-4">
              <h3 className="font-medium mb-4">Handwerker</h3>
              <div className="space-y-2">
                {craftsmen.map((craftsman) => (
                  <div key={craftsman.id} className="text-sm">
                    <div className="font-medium">{craftsman.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pl-4">
              <div className="text-center text-muted-foreground text-sm">
                Kalenderansicht wird mit einem Kalender-Framework implementiert.
                <br />
                Mock-Ereignisdaten sind im Code verfügbar.
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <MapView craftsmenLocations={craftsmenLocations} />
      )}
    </div>
  )
} 