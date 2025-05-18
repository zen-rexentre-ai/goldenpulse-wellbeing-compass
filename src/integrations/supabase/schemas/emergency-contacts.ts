
import { BaseDatabase } from './base';

// Emergency contacts-specific database schema
export interface EmergencyContactsSchema {
  public: {
    Tables: {
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
    };
  };
}
