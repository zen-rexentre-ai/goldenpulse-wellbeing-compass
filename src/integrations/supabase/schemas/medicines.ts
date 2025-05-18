
import { BaseDatabase } from './base';

// Medicines-specific database schema
export interface MedicinesSchema extends BaseDatabase {
  public: {
    Tables: {
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
    } & BaseDatabase['public']['Tables'];
  };
}
