export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string | null
          display_badges: string[] | null
          bio: string | null
          website: string | null
          level: string | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
          display_badges?: string[] | null
          bio?: string | null
          website?: string | null
          level?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
          display_badges?: string[] | null
          bio?: string | null
          website?: string | null
          level?: string | null
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          category: string
          created_at: string
          rarity: string | null
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          category: string
          created_at?: string
          rarity?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          category?: string
          created_at?: string
          rarity?: string | null
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
          is_featured: boolean
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
          is_featured?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
          is_featured?: boolean
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          completed_at: string
          progress: number | null
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          completed_at?: string
          progress?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          completed_at?: string
          progress?: number | null
        }
      }
      completed_projects: {
        Row: {
          id: string
          user_id: string
          project_id: number
          completed_at: string
          title: string
          level: string
          technologies: string[]
          frameworks: string[]
          databases: string[]
        }
        Insert: {
          id?: string
          user_id: string
          project_id: number
          completed_at?: string
          title: string
          level: string
          technologies: string[]
          frameworks: string[]
          databases: string[]
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: number
          completed_at?: string
          title?: string
          level?: string
          technologies?: string[]
          frameworks?: string[]
          databases?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
