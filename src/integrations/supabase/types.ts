export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
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
          last_login: string | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          phone: string | null
          preferred_language: string | null
          profile_completion_percentage: number | null
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
          last_login?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string | null
          preferred_language?: string | null
          profile_completion_percentage?: number | null
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
          last_login?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string | null
          preferred_language?: string | null
          profile_completion_percentage?: number | null
          subscription_status?: string | null
          subscription_tier?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_activity: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
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
      volunteering_alerts: {
        Row: {
          alert_type: string
          created_at: string
          email_sent: boolean
          id: string
          message: string | null
          registration_id: string | null
          scheduled_for: string
          sent_at: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string
          email_sent?: boolean
          id?: string
          message?: string | null
          registration_id?: string | null
          scheduled_for: string
          sent_at?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string
          email_sent?: boolean
          id?: string
          message?: string | null
          registration_id?: string | null
          scheduled_for?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteering_alerts_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "volunteering_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteering_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      volunteering_coordinators: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          organization: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          organization?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          organization?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      volunteering_opportunities: {
        Row: {
          category_id: string | null
          coordinator_id: string | null
          created_at: string
          date: string
          description: string | null
          filled_spots: number
          id: string
          is_active: boolean
          location: string
          organization: string
          requirements: string | null
          time: string
          title: string
          total_spots: number
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          coordinator_id?: string | null
          created_at?: string
          date: string
          description?: string | null
          filled_spots?: number
          id?: string
          is_active?: boolean
          location: string
          organization: string
          requirements?: string | null
          time: string
          title: string
          total_spots?: number
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          coordinator_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          filled_spots?: number
          id?: string
          is_active?: boolean
          location?: string
          organization?: string
          requirements?: string | null
          time?: string
          title?: string
          total_spots?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteering_opportunities_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "volunteering_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteering_opportunities_coordinator_id_fkey"
            columns: ["coordinator_id"]
            isOneToOne: false
            referencedRelation: "volunteering_coordinators"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteering_registrations: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          opportunity_id: string
          profile_id: string
          registrant_address: string
          registrant_name: string
          registrant_phone: string
          registration_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          opportunity_id: string
          profile_id: string
          registrant_address: string
          registrant_name: string
          registrant_phone: string
          registration_date?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          opportunity_id?: string
          profile_id?: string
          registrant_address?: string
          registrant_name?: string
          registrant_phone?: string
          registration_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteering_registrations_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "volunteering_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
