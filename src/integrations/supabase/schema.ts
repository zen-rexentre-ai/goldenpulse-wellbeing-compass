
import { Database } from './types';

// Extend the Database type with our custom tables
export type ExtendedDatabase = Database & {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          avatar_url: string | null;
          email: string;
          birth_date: string | null;
          phone: string | null;
          address: string | null;
          emergency_contact_id: string | null;
          subscription_tier: string | null;
          subscription_status: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          full_name: string;
          avatar_url?: string | null;
          email: string;
          birth_date?: string | null;
          phone?: string | null;
          address?: string | null;
          emergency_contact_id?: string | null;
          subscription_tier?: string | null;
          subscription_status?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          avatar_url?: string | null;
          email?: string;
          birth_date?: string | null;
          phone?: string | null;
          address?: string | null;
          emergency_contact_id?: string | null;
          subscription_tier?: string | null;
          subscription_status?: string | null;
        };
      };
      emergency_contacts: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          name: string;
          relationship: string;
          phone: string;
          email: string | null;
          is_primary: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          name: string;
          relationship: string;
          phone: string;
          email?: string | null;
          is_primary?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          name?: string;
          relationship?: string;
          phone?: string;
          email?: string | null;
          is_primary?: boolean;
        };
      };
      fitness_calculations: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          height: number;
          weight: number;
          age: number;
          activity_level: string;
          medical_conditions: string[] | null;
          score: number;
          recommendations: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          height: number;
          weight: number;
          age: number;
          activity_level: string;
          medical_conditions?: string[] | null;
          score: number;
          recommendations?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          height?: number;
          weight?: number;
          age?: number;
          activity_level?: string;
          medical_conditions?: string[] | null;
          score?: number;
          recommendations?: string[] | null;
        };
      };
      medicines: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          name: string;
          dosage: string;
          frequency: string;
          start_date: string;
          end_date: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          name: string;
          dosage: string;
          frequency: string;
          start_date: string;
          end_date?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          name?: string;
          dosage?: string;
          frequency?: string;
          start_date?: string;
          end_date?: string | null;
          notes?: string | null;
        };
      };
      appointments: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          title: string;
          provider: string;
          date: string;
          time: string;
          location: string | null;
          notes: string | null;
          reminder_set: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          title: string;
          provider: string;
          date: string;
          time: string;
          location?: string | null;
          notes?: string | null;
          reminder_set?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          title?: string;
          provider?: string;
          date?: string;
          time?: string;
          location?: string | null;
          notes?: string | null;
          reminder_set?: boolean;
        };
      };
      vitals: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          blood_pressure: string | null;
          heart_rate: number | null;
          blood_sugar: number | null;
          temperature: number | null;
          oxygen_level: number | null;
          recorded_date: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          blood_pressure?: string | null;
          heart_rate?: number | null;
          blood_sugar?: number | null;
          temperature?: number | null;
          oxygen_level?: number | null;
          recorded_date: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          blood_pressure?: string | null;
          heart_rate?: number | null;
          blood_sugar?: number | null;
          temperature?: number | null;
          oxygen_level?: number | null;
          recorded_date?: string;
        };
      };
    };
  };
};
