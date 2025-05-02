"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface BadgeItemProps {
  id: string
  name: string
  icon: string
  description: string
  rarity: string
  category: string
  isSelected: boolean
  onToggle?: (id: string, selected: boolean) => void
  selectable?: boolean
}

export function BadgeItem({
  id,
  name,
  icon,
  description,
  rarity,
  category,
  isSelected,
  onToggle,
  selectable = false,
}: BadgeItemProps) {
  const rarityColors = {
    common: "bg-slate-200 hover:bg-slate-300 text-slate-700",
    uncommon: "bg-green-200 hover:bg-green-300 text-green-800",
    rare: "bg-blue-200 hover:bg-blue-300 text-blue-800",
    epic: "bg-purple-200 hover:bg-purple-300 text-purple-800",
    legendary: "bg-amber-200 hover:bg-amber-300 text-amber-800",
  }

  const backgroundColor = rarityColors[rarity as keyof typeof rarityColors] || rarityColors.common

  const handleClick = () => {
    if (selectable && onToggle) {
      onToggle(id, !isSelected)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`relative cursor-pointer`} onClick={handleClick}>
            <Badge
              className={`px-3 py-1.5 text-sm font-medium flex items-center gap-2 ${backgroundColor} ${isSelected ? "ring-2 ring-offset-2 ring-blue-500" : ""} ${selectable ? "cursor-pointer" : ""}`}
              variant="outline"
            >
              <span className="text-lg" aria-hidden="true">
                {icon}
              </span>
              {name}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span className="font-bold">{name}</span>
            </div>
            <span className="text-xs capitalize">
              {category} • {rarity}
            </span>
            <p className="text-sm mt-1">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
