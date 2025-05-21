
import { Database as GeneratedDatabase } from '../types';

// Base database type that will be extended by other schema files
export interface BaseDatabase {
  public: {
    Tables: {};
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
