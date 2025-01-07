import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CraftsmanPillProps {
  id: string
  name: string
  onClick?: () => void
}

export function CraftsmanPill({ id, name, onClick }: CraftsmanPillProps) {
  if (onClick) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        className="h-6 px-2 text-xs rounded-full hover:bg-accent"
      >
        {name}
      </Button>
    )
  }

  return (
    <Badge
      variant="outline"
      className="text-xs rounded-full"
    >
      {name}
    </Badge>
  )
} 