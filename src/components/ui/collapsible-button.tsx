"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CollapsibleButtonProps {
  isCollapsed: boolean
  onClick: () => void
  direction?: "left" | "right"
}

export function CollapsibleButton({ isCollapsed, onClick, direction = "left" }: CollapsibleButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 -right-4 z-50 h-8 w-8 rounded-full border bg-background shadow-md"
      onClick={onClick}
    >
      {direction === "left" ? (
        isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )
      ) : isCollapsed ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  )
}