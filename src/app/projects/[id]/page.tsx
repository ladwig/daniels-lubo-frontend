"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Clock, Wrench, Upload, FileText, Eye, Plus, Smartphone, ArrowLeft } from "lucide-react"
import { CraftsmanPill } from "@/components/ui/craftsman-pill"

// Mock data for a project
const projectData = {
  id: "PRJ001",
  status: "in_progress",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+49 123 456789",
    address: "123 Main St, 10115 Berlin",
  },
  partner: {
    name: "1Komma5",
    contact: "Jane Smith",
    email: "jane.smith@1komma5.com",
    phone: "+49 987 654321",
  },
  system: {
    type: "Wärmepumpe",
    model: "EcoHeat Pro 9000",
    capacity: "9 kW",
    installation: "Erdwärme",
  },
  jobs: [
    {
      id: "J1",
      name: "Standortbesichtigung",
      status: "completed",
      craftsmen: [
        { id: "C1", name: "Mike Brown", role: "Gutachter" }
      ],
      appointment: "2024-02-15 09:00",
      duration: "2 Stunden",
    },
    {
      id: "J2",
      name: "Erdarbeiten",
      status: "in_progress",
      craftsmen: [
        { id: "C2", name: "Steve Wilson", role: "Hauptinstallateur" },
        { id: "C3", name: "John Smith", role: "Assistent" }
      ],
      appointment: "2024-02-20 08:30",
      duration: "6 Stunden",
    },
    {
      id: "J3",
      name: "Wärmepumpen-Installation",
      status: "pending",
      craftsmen: [
        { id: "C4", name: "Tom Davis", role: "Hauptinstallateur" },
        { id: "C5", name: "Alex Johnson", role: "Spezialist" }
      ],
      appointment: null,
      duration: "4 Stunden",
      isRework: true,
      reworkReason: "Erste Installation hatte Leistungsprobleme",
    },
  ],
  documents: [
    {
      id: "D1",
      name: "Standortbesichtigung Bericht.pdf",
      uploadedBy: "Mike Brown",
      uploadedAt: "2024-02-15",
      visibility: "all",
      size: "2.4 MB",
    },
    {
      id: "D2",
      name: "Installationsplan.pdf",
      uploadedBy: "Tom Davis",
      uploadedAt: "2024-02-18",
      visibility: "backoffice",
      size: "1.8 MB",
    },
    {
      id: "D3",
      name: "Kundenvertrag.pdf",
      uploadedBy: "Jane Smith",
      uploadedAt: "2024-02-10",
      visibility: "backoffice",
      size: "3.1 MB",
    },
    {
      id: "D4",
      name: "Systemspezifikationen.pdf",
      uploadedBy: "Alex Johnson",
      uploadedAt: "2024-02-19",
      visibility: "partner",
      size: "1.2 MB",
    },
  ],
}

// Mock data for craftsmen selection
const availableCraftsmen = [
  { id: "C1", name: "Mike Brown", role: "Gutachter" },
  { id: "C2", name: "Steve Wilson", role: "Hauptinstallateur" },
  { id: "C3", name: "John Smith", role: "Assistent" },
  { id: "C4", name: "Tom Davis", role: "Hauptinstallateur" },
  { id: "C5", name: "Alex Johnson", role: "Spezialist" },
]

interface PageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: PageProps) {
  // Use the mock data's project ID directly
  const projectId = projectData.id

  return (
    <div className="relative">
      {/* Back to Web Button - Fixed Position */}
      <Link
        href={`/projects/${params.id}`}
        className="fixed top-4 left-4 z-50 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Web</span>
      </Link>

      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projekte</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              {projectData.customer.name} - {projectData.id}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Projektdetails</h1>
            <p className="text-sm text-muted-foreground">
              Projekt ID: {projectData.id}
            </p>
          </div>
          <Badge
            variant={
              projectData.status === "completed"
                ? "default"
                : projectData.status === "in_progress"
                ? "secondary"
                : "outline"
            }
          >
            {projectData.status === "completed" ? "Abgeschlossen" : 
             projectData.status === "in_progress" ? "In Bearbeitung" : 
             "Ausstehend"}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Kunden & Partner Informationen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Kunde</h3>
                  <div className="text-sm space-y-1">
                    <p>{projectData.customer.name}</p>
                    <p className="text-muted-foreground">{projectData.customer.email}</p>
                    <p className="text-muted-foreground">{projectData.customer.phone}</p>
                    <p className="text-muted-foreground">{projectData.customer.address}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Partner</h3>
                  <div className="text-sm space-y-1">
                    <p>{projectData.partner.name}</p>
                    <p className="text-muted-foreground">Kontakt: {projectData.partner.contact}</p>
                    <p className="text-muted-foreground">{projectData.partner.email}</p>
                    <p className="text-muted-foreground">{projectData.partner.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Systeminformationen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Typ</span>
                  <span>{projectData.system.type}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Modell</span>
                  <span>{projectData.system.model}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Leistung</span>
                  <span>{projectData.system.capacity}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Installationsart</span>
                  <span>{projectData.system.installation}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs">
          <TabsList>
            <TabsTrigger value="jobs">Aufträge</TabsTrigger>
            <TabsTrigger value="documents">Dokumente</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Projektaufträge</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Neuer Auftrag
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Neuen Auftrag erstellen</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="jobName">Auftragsname</Label>
                          <Input id="jobName" placeholder="Auftragsnamen eingeben" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration">Dauer</Label>
                          <Input id="duration" placeholder="z.B. 2 Stunden" />
                        </div>
                        <div className="space-y-2">
                          <Label>Handwerker zuweisen</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Handwerker auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCraftsmen.map((craftsman) => (
                                <SelectItem key={craftsman.id} value={craftsman.id}>
                                  {craftsman.name} ({craftsman.role})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            Weitere Handwerker können nach der Erstellung des Auftrags zugewiesen werden
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>Anfangsstatus</Label>
                          <Select defaultValue="pending">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Ausstehend</SelectItem>
                              <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                              <SelectItem value="completed">Abgeschlossen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="pt-4">
                          <Button className="w-full">
                            Auftrag erstellen
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Handwerker</TableHead>
                    <TableHead>Termin</TableHead>
                    <TableHead>Dauer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectData.jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <Link
                          href={`/projects/PRJ001/jobs/${job.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {job.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            job.status === "completed"
                              ? "default"
                              : job.status === "in_progress"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {job.status === "completed" ? "Abgeschlossen" : 
                           job.status === "in_progress" ? "In Bearbeitung" : 
                           "Ausstehend"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {job.craftsmen.map((craftsman) => (
                            <CraftsmanPill
                              key={craftsman.id}
                              id={craftsman.id}
                              name={craftsman.name}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{job.appointment || "Nicht geplant"}</TableCell>
                      <TableCell>{job.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Projektdokumente</CardTitle>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Dokument hochladen
                  </Button>
                </div>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectData.documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Version Link */}
      <Link
        href={`/mobile/projects/${params.id}`}
        className="fixed bottom-6 right-6 bg-[#FEDC00] text-white p-3 rounded-full shadow-lg hover:bg-[#E5C700] active:bg-[#D1B600] transition-colors"
      >
        <Smartphone className="w-6 h-6" />
      </Link>
    </div>
  )
} 