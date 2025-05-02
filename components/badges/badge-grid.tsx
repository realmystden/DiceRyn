"use client"

import { BadgeItem } from "@/components/ui/badge-item"

export interface Badge {
  id: string
  name: string
  icon: string
  description: string
  category: string
  rarity: string
  isSelected?: boolean
}

interface BadgeGridProps {
  badges: Badge[]
  selectedBadges?: string[]
  onToggleBadge?: (id: string, selected: boolean) => void
  selectable?: boolean
  emptyMessage?: string
}

export function BadgeGrid({
  badges,
  selectedBadges = [],
  onToggleBadge,
  selectable = false,
  emptyMessage = "No badges to display",
}: BadgeGridProps) {
  if (!badges || badges.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">{emptyMessage}</div>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <BadgeItem
          key={badge.id}
          id={badge.id}
          name={badge.name}
          icon={badge.icon}
          description={badge.description}
          category={badge.category}
          rarity={badge.rarity}
          isSelected={selectedBadges.includes(badge.id)}
          onToggle={onToggleBadge}
          selectable={selectable}
        />
      ))}
    </div>
  )
}
