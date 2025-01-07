"use client"

import * as React from "react"
import { useState } from "react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
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
import { ChevronRight, ChevronDown } from "lucide-react"

// Mock data for an inventory check with more slots
const inventoryCheckData = {
  id: "IC1",
  licensePlate: "B-HW 1234",
  date: "2024-01-15",
  responsible: "John Smith",
  status: "complete",
  slots: [
    {
      id: "S1",
      name: "Driver's Cabin",
      slots: [
        {
          id: "S1-1",
          name: "Front Storage",
          items: [
            { id: "I1", name: "Safety Vest", counted: 2, required: 2 },
            { id: "I2", name: "First Aid Kit", counted: 1, required: 1 },
          ],
        },
        {
          id: "S1-2",
          name: "Door Compartments",
          items: [
            { id: "I3", name: "Vehicle Documents", counted: 1, required: 1 },
            { id: "I4", name: "Parking Disk", counted: 1, required: 1 },
          ],
        },
      ],
    },
    {
      id: "S2",
      name: "Main Storage",
      slots: [
        {
          id: "S2-1",
          name: "Tools Section",
          slots: [
            {
              id: "S2-1-1",
              name: "Power Tools",
              items: [
                { id: "I5", name: "Cordless Drill", counted: 2, required: 2 },
                { id: "I6", name: "Impact Driver", counted: 1, required: 2 },
              ],
            },
            {
              id: "S2-1-2",
              name: "Hand Tools",
              items: [
                { id: "I7", name: "Wrench Set", counted: 1, required: 1 },
                { id: "I8", name: "Screwdriver Set", counted: 2, required: 2 },
              ],
            },
          ],
        },
        {
          id: "S2-2",
          name: "Installation Materials",
          slots: [
            {
              id: "S2-2-1",
              name: "Pipes",
              items: [
                { id: "I9", name: "Copper Pipes (2m)", counted: 8, required: 10 },
                { id: "I10", name: "Pipe Fittings", counted: 20, required: 20 },
              ],
            },
            {
              id: "S2-2-2",
              name: "Insulation",
              items: [
                { id: "I11", name: "Pipe Insulation Rolls", counted: 4, required: 5 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "S3",
      name: "Safety Equipment",
      items: [
        { id: "I12", name: "Fire Extinguisher", counted: 1, required: 1 },
        { id: "I13", name: "Warning Triangle", counted: 2, required: 2 },
      ],
    },
  ],
}

interface PageProps {
  params: {
    licensePlate: string
    checkId: string
  }
}

interface InventoryItem {
  id: string
  name: string
  counted: number
  required: number
}

interface InventorySlot {
  id: string
  name: string
  slots?: InventorySlot[]
  items?: InventoryItem[]
}

function InventorySlotRow({
  slot,
  depth = 0,
}: {
  slot: InventorySlot
  depth?: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasNestedContent = (slot.slots && slot.slots.length > 0) || (slot.items && slot.items.length > 0)
  const missingItems = slot.items?.some(item => item.counted < item.required) || 
    slot.slots?.some(subSlot => 
      subSlot.items?.some(item => item.counted < item.required) ||
      subSlot.slots?.some(s => s.items?.some(item => item.counted < item.required))
    )

  return (
    <>
      <TableRow>
        <TableCell className="font-medium" style={{ paddingLeft: `${depth * 2}rem` }}>
          <div className="flex items-center gap-2">
            {hasNestedContent && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}
            {slot.name}
          </div>
        </TableCell>
        <TableCell />
        <TableCell />
        <TableCell>
          {missingItems && (
            <Badge variant="destructive" className="text-xs">
              Missing Items
            </Badge>
          )}
        </TableCell>
      </TableRow>
      {isExpanded && (
        <>
          {slot.items?.map((item) => (
            <TableRow key={item.id}>
              <TableCell style={{ paddingLeft: `${(depth + 1) * 2}rem` }}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="h-4 w-4" />
                  {item.name}
                </div>
              </TableCell>
              <TableCell className="text-sm">{item.counted}</TableCell>
              <TableCell className="text-sm">{item.required}</TableCell>
              <TableCell>
                <Badge
                  variant={item.counted >= item.required ? "default" : "destructive"}
                  className="text-xs"
                >
                  {item.counted >= item.required ? "Complete" : "Missing Items"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {slot.slots?.map((subSlot) => (
            <InventorySlotRow key={subSlot.id} slot={subSlot} depth={depth + 1} />
          ))}
        </>
      )}
    </>
  )
}

export default function InventoryCheckPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <Breadcrumb
        segments={[
          { title: "Inventory", href: "/inventories" },
          { title: params.licensePlate, href: `/inventories?vehicle=${params.licensePlate}` },
          { title: `Check ${params.checkId}`, href: `/inventories/${params.licensePlate}/checks/${params.checkId}` },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory Check Details</h1>
          <p className="text-sm text-muted-foreground">
            Vehicle: {inventoryCheckData.licensePlate} | Date: {inventoryCheckData.date}
          </p>
        </div>
        <Badge variant={inventoryCheckData.status === "complete" ? "default" : "destructive"}>
          {inventoryCheckData.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Inventory Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location / Item</TableHead>
                <TableHead>Counted</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryCheckData.slots.map((slot) => (
                <InventorySlotRow key={slot.id} slot={slot} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 