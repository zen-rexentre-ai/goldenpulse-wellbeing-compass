export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      anonymous_health_calculations: {
        Row: {
          age: number
          alcohol_units: number | null
          created_at: string | null
          diastolic_bp: number | null
          exercise_minutes: number | null
          gender: string | null
          good_sleep_quality: boolean | null
          hba1c: number | null
          heart_rate: number | null
          height: number
          height_unit: string
          id: string
          score: number
          session_id: string
          smoking_status: string | null
          stress_level: number | null
          systolic_bp: number | null
          weight: number
          weight_unit: string
        }
        Insert: {
          age: number
          alcohol_units?: number | null
          created_at?: string | null
          diastolic_bp?: number | null
          exercise_minutes?: number | null
          gender?: string | null
          good_sleep_quality?: boolean | null
          hba1c?: number | null
          heart_rate?: number | null
          height: number
          height_unit: string
          id?: string
          score: number
          session_id: string
          smoking_status?: string | null
          stress_level?: number | null
          systolic_bp?: number | null
          weight: number
          weight_unit: string
        }
        Update: {
          age?: number
          alcohol_units?: number | null
          created_at?: string | null
          diastolic_bp?: number | null
          exercise_minutes?: number | null
          gender?: string | null
          good_sleep_quality?: boolean | null
          hba1c?: number | null
          heart_rate?: number | null
          height?: number
          height_unit?: string
          id?: string
          score?: number
          session_id?: string
          smoking_status?: string | null
          stress_level?: number | null
          systolic_bp?: number | null
          weight?: number
          weight_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "anonymous_health_calculations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "anonymous_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      anonymous_medical_conditions: {
        Row: {
          calculation_id: string
          condition_type: string
          created_at: string | null
          id: string
          severity_level: number
        }
        Insert: {
          calculation_id: string
          condition_type: string
          created_at?: string | null
          id?: string
          severity_level: number
        }
        Update: {
          calculation_id?: string
          condition_type?: string
          created_at?: string | null
          id?: string
          severity_level?: number
        }
        Relationships: [
          {
            foreignKeyName: "anonymous_medical_conditions_calculation_id_fkey"
            columns: ["calculation_id"]
            isOneToOne: false
            referencedRelation: "anonymous_health_calculations"
            referencedColumns: ["id"]
          },
        ]
      }
      anonymous_recommendations: {
        Row: {
          calculation_id: string
          created_at: string | null
          id: string
          impact: string
          priority: string
          recommendation_text: string
        }
        Insert: {
          calculation_id: string
          created_at?: string | null
          id?: string
          impact: string
          priority: string
          recommendation_text: string
        }
        Update: {
          calculation_id?: string
          created_at?: string | null
          id?: string
          impact?: string
          priority?: string
          recommendation_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "anonymous_recommendations_calculation_id_fkey"
            columns: ["calculation_id"]
            isOneToOne: false
            referencedRelation: "anonymous_health_calculations"
            referencedColumns: ["id"]
          },
        ]
      }
      anonymous_sessions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          ip_address: unknown | null
          last_activity: string | null
          session_token: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown | null
          last_activity?: string | null
          session_token: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown | null
          last_activity?: string | null
          session_token?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      anonymous_wellness_calculations: {
        Row: {
          age: number
          alcohol_units: number | null
          calculated_score: number
          calculation_date: string | null
          cancer_level: string | null
          created_at: string | null
          diabetes_level: number | null
          diastolic_bp: number | null
          email: string | null
          exercise_minutes: number | null
          gender: string | null
          good_sleep_quality: boolean | null
          hba1c: number | null
          heart_rate: number | null
          heart_related_level: string | null
          height: number
          height_unit: string
          hypertension_level: number | null
          id: string
          name: string | null
          normalized_values: Json | null
          others_level: string | null
          phone: string | null
          recommendations: Json | null
          session_token: string | null
          smoking_status: string | null
          stress_level: string | null
          systolic_bp: number | null
          weight: number
          weight_unit: string
        }
        Insert: {
          age: number
          alcohol_units?: number | null
          calculated_score: number
          calculation_date?: string | null
          cancer_level?: string | null
          created_at?: string | null
          diabetes_level?: number | null
          diastolic_bp?: number | null
          email?: string | null
          exercise_minutes?: number | null
          gender?: string | null
          good_sleep_quality?: boolean | null
          hba1c?: number | null
          heart_rate?: number | null
          heart_related_level?: string | null
          height: number
          height_unit: string
          hypertension_level?: number | null
          id?: string
          name?: string | null
          normalized_values?: Json | null
          others_level?: string | null
          phone?: string | null
          recommendations?: Json | null
          session_token?: string | null
          smoking_status?: string | null
          stress_level?: string | null
          systolic_bp?: number | null
          weight: number
          weight_unit: string
        }
        Update: {
          age?: number
          alcohol_units?: number | null
          calculated_score?: number
          calculation_date?: string | null
          cancer_level?: string | null
          created_at?: string | null
          diabetes_level?: number | null
          diastolic_bp?: number | null
          email?: string | null
          exercise_minutes?: number | null
          gender?: string | null
          good_sleep_quality?: boolean | null
          hba1c?: number | null
          heart_rate?: number | null
          heart_related_level?: string | null
          height?: number
          height_unit?: string
          hypertension_level?: number | null
          id?: string
          name?: string | null
          normalized_values?: Json | null
          others_level?: string | null
          phone?: string | null
          recommendations?: Json | null
          session_token?: string | null
          smoking_status?: string | null
          stress_level?: string | null
          systolic_bp?: number | null
          weight?: number
          weight_unit?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string
          date: string
          id: string
          location: string | null
          notes: string | null
          profile_id: string
          provider: string
          reminder_set: boolean
          time: string
          title: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          location?: string | null
          notes?: string | null
          profile_id: string
          provider: string
          reminder_set?: boolean
          time: string
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          location?: string | null
          notes?: string | null
          profile_id?: string
          provider?: string
          reminder_set?: boolean
          time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_primary: boolean
          name: string
          phone: string
          profile_id: string
          relationship: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_primary?: boolean
          name: string
          phone: string
          profile_id: string
          relationship: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_primary?: boolean
          name?: string
          phone?: string
          profile_id?: string
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fitness_calculations: {
        Row: {
          activity_level: string
          age: number
          created_at: string
          height: number
          id: string
          medical_conditions: string[] | null
          profile_id: string
          recommendations: string[] | null
          score: number
          weight: number
        }
        Insert: {
          activity_level: string
          age: number
          created_at?: string
          height: number
          id?: string
          medical_conditions?: string[] | null
          profile_id: string
          recommendations?: string[] | null
          score: number
          weight: number
        }
        Update: {
          activity_level?: string
          age?: number
          created_at?: string
          height?: number
          id?: string
          medical_conditions?: string[] | null
          profile_id?: string
          recommendations?: string[] | null
          score?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "fitness_calculations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medicines: {
        Row: {
          created_at: string
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          name: string
          notes: string | null
          profile_id: string
          start_date: string
        }
        Insert: {
          created_at?: string
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          name: string
          notes?: string | null
          profile_id: string
          start_date: string
        }
        Update: {
          created_at?: string
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          name?: string
          notes?: string | null
          profile_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "medicines_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          birth_date: string | null
          created_at: string
          email: string
          emergency_contact_id: string | null
          full_name: string
          id: string
          phone: string | null
          preferred_language: string | null
          subscription_status: string | null
          subscription_tier: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          created_at?: string
          email: string
          emergency_contact_id?: string | null
          full_name: string
          id: string
          phone?: string | null
          preferred_language?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string
          emergency_contact_id?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          preferred_language?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
        }
        Relationships: []
      }
      vitals: {
        Row: {
          blood_pressure: string | null
          blood_sugar: number | null
          created_at: string
          heart_rate: number | null
          id: string
          oxygen_level: number | null
          profile_id: string
          recorded_date: string
          temperature: number | null
        }
        Insert: {
          blood_pressure?: string | null
          blood_sugar?: number | null
          created_at?: string
          heart_rate?: number | null
          id?: string
          oxygen_level?: number | null
          profile_id: string
          recorded_date: string
          temperature?: number | null
        }
        Update: {
          blood_pressure?: string | null
          blood_sugar?: number | null
          created_at?: string
          heart_rate?: number | null
          id?: string
          oxygen_level?: number | null
          profile_id?: string
          recorded_date?: string
          temperature?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vitals_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_anonymous_session_id: {
        Args: { p_session_token: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
