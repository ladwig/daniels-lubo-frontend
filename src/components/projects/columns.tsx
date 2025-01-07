import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export type Project = {
  id: string
  partnerName: string
  customerName: string
  location: string
  status: "pending" | "in_progress" | "completed" | "rework"
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "Project ID",
    cell: ({ row }) => {
      return (
        <Link 
          href={`/projects/${row.original.id}`}
          className="font-medium hover:underline"
        >
          {row.getValue("id")}
        </Link>
      )
    },
  },
  {
    accessorKey: "partnerName",
    header: "Partner",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
        pending: { label: "Pending", variant: "secondary" },
        in_progress: { label: "In Progress", variant: "default" },
        completed: { label: "Completed", variant: "default" },
        rework: { label: "Rework", variant: "destructive" },
      }

      const { label, variant } = statusMap[status]

      return <Badge variant={variant}>{label}</Badge>
    },
  },
] 