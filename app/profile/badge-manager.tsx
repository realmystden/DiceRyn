"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { BadgeGrid } from "@/components/badges/badge-grid"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Badge as BadgeType } from "@/components/badges/badge-grid"
import { Loader2 } from "lucide-react"

export function BadgeManager({ userId }: { userId: string }) {
  const [userBadges, setUserBadges] = useState<BadgeType[]>([])
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = getSupabaseClient()

  // Fetch user badges and currently displayed badges
  useEffect(() => {
    const fetchBadges = async () => {
      setIsLoading(true)
      try {
        // Get user badges
        const { data: userBadgesData, error: userBadgesError } = await supabase
          .from("user_badges")
          .select(`
            badge_id,
            badges:badge_id (
              id,
              name,
              icon,
              description,
              category,
              rarity
            )
          `)
          .eq("user_id", userId)

        if (userBadgesError) throw userBadgesError

        // Get user's currently selected display badges
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("display_badges")
          .eq("id", userId)
          .single()

        if (profileError) throw profileError

        const formattedBadges = userBadgesData.map((item) => ({
          id: item.badges.id,
          name: item.badges.name,
          icon: item.badges.icon,
          description: item.badges.description,
          category: item.badges.category,
          rarity: item.badges.rarity,
        }))

        setUserBadges(formattedBadges)
        setSelectedBadges(profileData?.display_badges || [])
      } catch (error) {
        console.error("Error fetching badges:", error)
        toast({
          title: "Error",
          description: "Failed to load badges",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchBadges()
    }
  }, [userId, supabase])

  // Handle badge selection toggle
  const handleToggleBadge = (id: string, selected: boolean) => {
    if (selected) {
      // Limit to 5 badges max
      if (selectedBadges.length >= 5) {
        toast({
          title: "Maximum reached",
          description: "You can only select up to 5 badges to display",
        })
        return
      }
      setSelectedBadges((prev) => [...prev, id])
    } else {
      setSelectedBadges((prev) => prev.filter((badgeId) => badgeId !== id))
    }
  }

  // Save selected badges to profile
  const saveSelectedBadges = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_badges: selectedBadges,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (error) throw error

      toast({
        title: "Badges updated",
        description: "Your profile badges have been updated successfully",
      })
    } catch (error) {
      console.error("Error saving badges:", error)
      toast({
        title: "Error",
        description: "Failed to update profile badges",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Group badges by category
  const badgesByCategory = userBadges.reduce(
    (acc, badge) => {
      if (!acc[badge.category]) {
        acc[badge.category] = []
      }
      acc[badge.category].push(badge)
      return acc
    },
    {} as Record<string, BadgeType[]>,
  )

  const categories = Object.keys(badgesByCategory)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (userBadges.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          You haven't earned any badges yet. Complete achievements to earn badges!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Selected Badges ({selectedBadges.length}/5)</h3>
        <div className="bg-muted/50 p-4 rounded-md min-h-20">
          <BadgeGrid
            badges={userBadges.filter((badge) => selectedBadges.includes(badge.id))}
            selectedBadges={selectedBadges}
            onToggleBadge={handleToggleBadge}
            selectable={true}
            emptyMessage="No badges selected. Choose badges below to display on your profile."
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Available Badges</h3>

        <Tabs defaultValue={categories[0] || "all"}>
          <TabsList className="mb-4 flex-wrap">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="p-1">
            <BadgeGrid
              badges={userBadges}
              selectedBadges={selectedBadges}
              onToggleBadge={handleToggleBadge}
              selectable={true}
            />
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="p-1">
              <BadgeGrid
                badges={badgesByCategory[category]}
                selectedBadges={selectedBadges}
                onToggleBadge={handleToggleBadge}
                selectable={true}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Button onClick={saveSelectedBadges} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  )
}
