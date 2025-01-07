import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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
import { Clock } from "lucide-react"
import { CraftsmanPill } from "@/components/ui/craftsman-pill"

// Mock data for a job
const jobData = {
  id: "J3",
  name: "Heat Pump Installation",
  status: "pending",
  craftsmen: [
    { id: "C4", name: "Tom Davis", role: "Lead Installer" },
    { id: "C5", name: "Alex Johnson", role: "Specialist" }
  ],
  appointment: null,
  duration: "4 hours",
  isRework: true,
  reworkReason: "Initial installation had performance issues",
  tasks: [
    {
      id: "T1",
      name: "Site Preparation",
      status: "completed",
      assignedTo: "Tom Davis",
      notes: "Area cleared and marked for installation",
    },
    {
      id: "T2",
      name: "Equipment Delivery",
      status: "completed",
      assignedTo: "Alex Johnson",
      notes: "All components received and checked",
    },
    {
      id: "T3",
      name: "Heat Pump Mounting",
      status: "in_progress",
      assignedTo: "Tom Davis",
      notes: "Foundation prepared, mounting in progress",
    },
    {
      id: "T4",
      name: "Pipe Installation",
      status: "pending",
      assignedTo: "Alex Johnson",
      notes: "Awaiting completion of mounting",
    },
    {
      id: "T5",
      name: "System Testing",
      status: "pending",
      assignedTo: "Tom Davis",
      notes: "To be conducted after installation",
    },
  ],
  usedItems: [
    {
      id: "I1",
      name: "Copper Pipe 15mm",
      amount: 12,
      unit: "meters",
    },
    {
      id: "I2",
      name: "Pipe Insulation",
      amount: 12,
      unit: "meters",
    },
    {
      id: "I3",
      name: "Mounting Brackets",
      amount: 4,
      unit: "pieces",
    },
    {
      id: "I4",
      name: "Heat Transfer Fluid",
      amount: 5,
      unit: "liters",
    },
    {
      id: "I5",
      name: "Pipe Fittings 15mm",
      amount: 8,
      unit: "pieces",
    },
  ],
}

interface PageProps {
  params: {
    id: string
    jobId: string
  }
}

export default function JobPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">Projekte</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/projects/${params.id}`}>Projekt {params.id}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {jobData.name} - {jobData.id}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{jobData.name}</h1>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {jobData.duration}
            </div>
            <div className="flex items-center gap-2">
              {jobData.craftsmen.map((craftsman) => (
                <CraftsmanPill
                  key={craftsman.id}
                  id={craftsman.id}
                  name={craftsman.name}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={jobData.status === "completed" ? "default" : "secondary"}
          >
            {jobData.status}
          </Badge>
          {jobData.isRework && (
            <Badge variant="destructive">Rework Required</Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="items">Used Items</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobData.tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CraftsmanPill
                          id={task.id}
                          name={task.assignedTo}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          task.status === "completed"
                            ? "default"
                            : task.status === "in_progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {task.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="items">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobData.usedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{item.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 