export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      completed_projects: {
        Row: {
          id: number
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
          id?: number
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
          id?: number
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
      achievements: {
        Row: {
          id: number
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: number
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          achievement_id?: string
          unlocked_at?: string
        }
      }
      badges: {
        Row: {
          id: number
          user_id: string
          badge_id: string
          unlocked_at: string
        }
        Insert: {
          id?: number
          user_id: string
          badge_id: string
          unlocked_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          badge_id?: string
          unlocked_at?: string
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
