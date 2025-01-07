import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface BreadcrumbSegment {
  title: string
  href: string
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[]
}

export function Breadcrumb({ segments }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {segments.map((segment, index) => (
        <div key={segment.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          <Link
            href={segment.href}
            className={
              index === segments.length - 1
                ? "font-medium text-foreground"
                : "hover:text-foreground"
            }
          >
            {segment.title}
          </Link>
        </div>
      ))}
    </nav>
  )
} 