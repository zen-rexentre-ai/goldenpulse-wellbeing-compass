
import { BaseDatabase } from './schemas/base';
import { ProfilesSchema } from './schemas/profiles';
import { EmergencyContactsSchema } from './schemas/emergency-contacts';
import { FitnessCalculationsSchema } from './schemas/fitness-calculations';
import { MedicinesSchema } from './schemas/medicines';
import { AppointmentsSchema } from './schemas/appointments';
import { VitalsSchema } from './schemas/vitals';

// Define a combined database type that merges all schema definitions
export interface Database extends BaseDatabase {
  public: {
    Tables: 
      & ProfilesSchema['public']['Tables']
      & EmergencyContactsSchema['public']['Tables']
      & FitnessCalculationsSchema['public']['Tables']
      & MedicinesSchema['public']['Tables']
      & AppointmentsSchema['public']['Tables']
      & VitalsSchema['public']['Tables'];
    Views: BaseDatabase['public']['Views'];
    Functions: BaseDatabase['public']['Functions'];
    Enums: BaseDatabase['public']['Enums'];
    CompositeTypes: BaseDatabase['public']['CompositeTypes'];
  }
}

// Create a type for the Supabase client
export type ExtendedDatabase = Database;
