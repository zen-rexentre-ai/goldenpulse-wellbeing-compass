
import { BaseDatabase } from './base';

// Fitness calculations-specific database schema
export interface FitnessCalculationsSchema extends BaseDatabase {
  public: {
    Tables: {
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
    } & BaseDatabase['public']['Tables'];
  };
}
