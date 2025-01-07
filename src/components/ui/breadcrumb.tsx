import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbProps {
  children: React.ReactNode
  className?: string
}

interface BreadcrumbItemProps {
  children: React.ReactNode
  isCurrentPage?: boolean
}

interface BreadcrumbLinkProps {
  children: React.ReactNode
  href?: string
  className?: string
}

export function Breadcrumb({ children, className }: BreadcrumbProps) {
  const childrenArray = React.Children.toArray(children)
  const childrenWithSeparator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <React.Fragment key={index}>
          {child}
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </React.Fragment>
      )
    }
    return child
  })

  return (
    <nav aria-label="breadcrumb">
      <ol className={cn("flex items-center space-x-2", className)}>
        {childrenWithSeparator}
      </ol>
    </nav>
  )
}

export function BreadcrumbItem({ children, isCurrentPage }: BreadcrumbItemProps) {
  return (
    <li className="flex items-center space-x-2">
      {children}
    </li>
  )
}

export function BreadcrumbLink({ children, href, className }: BreadcrumbLinkProps) {
  if (!href) {
    return (
      <span className={cn("text-sm text-muted-foreground", className)}>
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-foreground hover:text-muted-foreground transition-colors",
        className
      )}
    >
      {children}
    </Link>
  )
} 