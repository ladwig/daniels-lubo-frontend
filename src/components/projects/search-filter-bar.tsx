"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchFilterBarProps {
  onSearchChange: (value: string) => void
  onStatusFilter: (value: string) => void
  onPartnerFilter: (value: string) => void
  onLocationFilter: (value: string) => void
  locations: string[]
}

export function SearchFilterBar({
  onSearchChange,
  onStatusFilter,
  onPartnerFilter,
  onLocationFilter,
  locations,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Suche nach Projekten..."
          className="pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Select onValueChange={onStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Status</SelectItem>
            <SelectItem value="pending">Ausstehend</SelectItem>
            <SelectItem value="in_progress">In Bearbeitung</SelectItem>
            <SelectItem value="completed">Abgeschlossen</SelectItem>
            <SelectItem value="on_hold">Pausiert</SelectItem>
            <SelectItem value="cancelled">Storniert</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onPartnerFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Partner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Partner</SelectItem>
            <SelectItem value="1Komma5">1Komma5</SelectItem>
            <SelectItem value="42Watt">42Watt</SelectItem>
            <SelectItem value="Montamo">Montamo</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onLocationFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Standort" />
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
      </div>
    </div>
  )
} 