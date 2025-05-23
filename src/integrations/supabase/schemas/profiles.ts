
import { BaseDatabase } from './base';

// Profile-specific database schema
export interface ProfilesSchema extends BaseDatabase {
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
          preferred_language: string | null;
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
          preferred_language?: string | null;
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
          preferred_language?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
