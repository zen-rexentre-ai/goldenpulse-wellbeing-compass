
import { BaseDatabase } from './schemas/base';
import { ProfilesSchema } from './schemas/profiles';
import { EmergencyContactsSchema } from './schemas/emergency-contacts';
import { FitnessCalculationsSchema } from './schemas/fitness-calculations';
import { MedicinesSchema } from './schemas/medicines';
import { AppointmentsSchema } from './schemas/appointments';
import { VitalsSchema } from './schemas/vitals';

// Combine all schema interfaces into a single Database interface
export interface Database extends 
  BaseDatabase,
  ProfilesSchema,
  EmergencyContactsSchema,
  FitnessCalculationsSchema,
  MedicinesSchema,
  AppointmentsSchema,
  VitalsSchema {}

// Create a type for the Supabase client
export type ExtendedDatabase = Database;
