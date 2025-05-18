
import { BaseDatabase } from './base';

// Profile-specific database schema
export interface ProfilesSchema {
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
    };
  };
}
