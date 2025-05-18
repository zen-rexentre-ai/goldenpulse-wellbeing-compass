
import { BaseDatabase } from './base';

// Vitals-specific database schema
export interface VitalsSchema extends BaseDatabase {
  public: {
    Tables: {
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
    } & BaseDatabase['public']['Tables'];
  };
}
