"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, AlertCircle, CheckCircle2, Car, Warehouse, List } from "lucide-react"
import Link from "next/link"

// Mock data for inventories and inventory checks
const inventories = [
  {
    id: "V1",
    type: "vehicle",
    identifier: "B-HW 1234",
    lastCheck: "2024-01-15",
    isOverdue: false,
  },
  {
    id: "V2",
    type: "vehicle",
    identifier: "B-HW 5678",
    lastCheck: "2023-12-01",
    isOverdue: true,
  },
  {
    id: "V3",
    type: "vehicle",
    identifier: "B-HW 9012",
    lastCheck: "2024-02-01",
    isOverdue: false,
  },
  {
    id: "V4",
    type: "vehicle",
    identifier: "B-HW 3456",
    lastCheck: "2023-11-15",
    isOverdue: true,
  },
  {
    id: "W1",
    type: "warehouse",
    identifier: "MUC",
    lastCheck: "2024-02-10",
    isOverdue: false,
  },
  {
    id: "W2",
    type: "warehouse",
    identifier: "STUT",
    lastCheck: "2024-01-20",
    isOverdue: true,
  },
]

const inventoryChecks = [
  {
    id: "IC1",
    identifier: "B-HW 1234",
    date: "2024-01-15",
    responsible: "John Smith",
    notes: "All equipment complete and in good condition",
    status: "complete",
  },
  {
    id: "IC2",
    identifier: "B-HW 5678",
    date: "2023-12-01",
    responsible: "Mike Johnson",
    notes: "Missing safety equipment, needs immediate attention",
    status: "incomplete",
  },
  {
    id: "IC3",
    identifier: "B-HW 9012",
    date: "2024-02-01",
    responsible: "Sarah Wilson",
    notes: "Regular check completed, replaced worn tools",
    status: "complete",
  },
  {
    id: "IC4",
    identifier: "B-HW 3456",
    date: "2023-11-15",
    responsible: "Tom Davis",
    notes: "Several tools need replacement",
    status: "incomplete",
  },
  {
    id: "IC5",
    identifier: "MUC",
    date: "2024-02-10",
    responsible: "Anna Schmidt",
    notes: "Warehouse inventory complete, stock levels updated",
    status: "complete",
  },
  {
    id: "IC6",
    identifier: "STUT",
    date: "2024-01-20",
    responsible: "Max Weber",
    notes: "Missing items in storage section B, reorder required",
    status: "incomplete",
  },
]

type ViewType = "cards" | "table"

export default function InventoriesPage() {
  const [view, setView] = useState<ViewType>("cards")
  const [search, setSearch] = useState("")
  const [selectedInventory, setSelectedInventory] = useState<string | null>(null)

  const filteredInventories = inventories.filter(inventory =>
    inventory.identifier.toLowerCase().includes(search.toLowerCase())
  )

  const filteredChecks = inventoryChecks.filter(check => {
    const matchesSearch = check.identifier.toLowerCase().includes(search.toLowerCase())
    const matchesInventory = selectedInventory ? check.identifier === selectedInventory : true
    return matchesSearch && matchesInventory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventar</h1>
          <p className="text-sm text-muted-foreground">
            Fahrzeuge und Lager verwalten
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setView("cards")
              setSelectedInventory(null)
            }}
          >
            <Warehouse className="h-4 w-4 mr-1" />
            Inventarübersicht
          </Button>
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
          >
            <List className="h-4 w-4 mr-1" />
            Prüfungshistorie
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={view === "cards" ? "Fahrzeuge oder Lager suchen..." : "Prüfungen suchen..."}
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {view === "cards" ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredInventories.map((inventory) => (
            <Card
              key={inventory.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                inventory.isOverdue ? "border-destructive" : ""
              }`}
              onClick={() => {
                setView("table")
                setSelectedInventory(inventory.identifier)
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {inventory.type === "vehicle" ? (
                      <Car className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Warehouse className="h-4 w-4 text-muted-foreground" />
                    )}
                    <CardTitle className="text-base">
                      {inventory.identifier}
                    </CardTitle>
                  </div>
                  {inventory.isOverdue ? (
                    <Badge variant="destructive" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Überfällig
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Aktuell
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Letzte Prüfung: {inventory.lastCheck}
                </div>
                {inventory.isOverdue && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    Sofortige Aufmerksamkeit erforderlich
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {selectedInventory ? `Prüfungen für ${selectedInventory}` : "Alle Prüfungen"}
              </CardTitle>
              {selectedInventory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedInventory(null)}
                >
                  Alle anzeigen
                </Button>
              )}
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Kennung</TableHead>
                <TableHead>Verantwortlich</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notizen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChecks.map((check) => (
                <TableRow key={check.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/inventories/${check.identifier}/checks/${check.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {check.date}
                    </Link>
                  </TableCell>
                  <TableCell>{check.identifier}</TableCell>
                  <TableCell>{check.responsible}</TableCell>
                  <TableCell>
                    <Badge
                      variant={check.status === "complete" ? "secondary" : "destructive"}
                    >
                      {check.status === "complete" ? "Abgeschlossen" : "Unvollständig"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {check.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
} 