"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { achievementService, type Badge as BadgeType } from "@/lib/services/achievement-service"

export function BadgesDisplay() {
  const [badges, setBadges] = useState<BadgeType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    async function fetchBadges() {
      setLoading(true)
      try {
        const { badges, error } = await achievementService.getUserBadges()
        if (error) throw error
        setBadges(badges)
      } catch (err) {
        console.error("Error fetching badges:", err)
        setError("Failed to load badges. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBadges()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        <span className="ml-2 text-white font-fondamento">Cargando insignias...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400 font-fondamento">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-white"
        >
          Reintentar
        </button>
      </div>
    )
  }

  // Filter badges based on selected filter
  const filteredBadges = badges.filter((badge) => {
    if (filter === "all") return true
    return badge.rarity === filter
  })

  // Group badges by rarity for statistics
  const badgesByRarity = badges.reduce(
    (acc, badge) => {
      const rarity = badge.rarity
      if (!acc[rarity]) {
        acc[rarity] = 0
      }
      acc[rarity]++
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <div className="fantasy-card p-4 bg-gray-800/50 border-gray-700">
        <h2 className="text-xl font-cinzel font-bold text-white mb-4">Colección de Insignias</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(badgesByRarity).map(([rarity, count]) => {
            let rarityColor = "bg-gray-600"
            if (rarity === "common") rarityColor = "bg-green-600"
            if (rarity === "uncommon") rarityColor = "bg-blue-600"
            if (rarity === "rare") rarityColor = "bg-indigo-600"
            if (rarity === "epic") rarityColor = "bg-purple-600"
            if (rarity === "legendary") rarityColor = "bg-amber-600"

            return (
              <div key={rarity} className="text-center">
                <div className="text-sm text-gray-300 mb-1 font-fondamento capitalize">{rarity}</div>
                <Badge className={rarityColor}>{count}</Badge>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="all" className="font-fondamento">
              Todas
            </TabsTrigger>
            <TabsTrigger value="common" className="font-fondamento">
              Comunes
            </TabsTrigger>
            <TabsTrigger value="uncommon" className="font-fondamento">
              Poco comunes
            </TabsTrigger>
            <TabsTrigger value="rare" className="font-fondamento">
              Raras
            </TabsTrigger>
            <TabsTrigger value="epic" className="font-fondamento">
              Épicas
            </TabsTrigger>
            <TabsTrigger value="legendary" className="font-fondamento">
              Legendarias
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBadges.length > 0 ? (
            filteredBadges.map((badge) => {
              // Determine card styling based on rarity
              let cardStyle = "bg-gray-800/50 border-gray-700"
              let rarityBadgeStyle = "bg-gray-700 text-gray-300"

              if (badge.rarity === "common") {
                cardStyle = "bg-green-900/30 border-green-700"
                rarityBadgeStyle = "bg-green-800 text-green-200"
              } else if (badge.rarity === "uncommon") {
                cardStyle = "bg-blue-900/30 border-blue-700"
                rarityBadgeStyle = "bg-blue-800 text-blue-200"
              } else if (badge.rarity === "rare") {
                cardStyle = "bg-indigo-900/30 border-indigo-700"
                rarityBadgeStyle = "bg-indigo-800 text-indigo-200"
              } else if (badge.rarity === "epic") {
                cardStyle = "bg-purple-900/30 border-purple-700"
                rarityBadgeStyle = "bg-purple-800 text-purple-200"
              } else if (badge.rarity === "legendary") {
                cardStyle = "bg-amber-900/30 border-amber-700"
                rarityBadgeStyle = "bg-amber-800 text-amber-200"
              }

              return (
                <Card key={badge.id} className={`fantasy-card ${cardStyle}`}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-3">
                      <img
                        src={badge.image_url || "/placeholder.svg?height=48&width=48&query=badge"}
                        alt={badge.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <h3 className="font-cinzel font-bold text-white">{badge.name}</h3>
                    <p className="text-sm text-gray-300 font-fondamento mt-1">{badge.description}</p>

                    <div className="mt-3">
                      <Badge className={rarityBadgeStyle + " capitalize"}>{badge.rarity}</Badge>
                    </div>

                    <span className="text-xs text-gray-400 mt-2 font-fondamento">
                      Obtenida el {new Date(badge.earned_at || "").toLocaleDateString()}
                    </span>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-400 font-fondamento">
              No has obtenido ninguna insignia de este tipo todavía.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
