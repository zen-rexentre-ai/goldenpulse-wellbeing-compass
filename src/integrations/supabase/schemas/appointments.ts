
import { BaseDatabase } from './base';

// Appointments-specific database schema
export interface AppointmentsSchema extends BaseDatabase {
  public: {
    Tables: {
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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
