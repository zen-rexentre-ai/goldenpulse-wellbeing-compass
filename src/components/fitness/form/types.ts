
import { z } from 'zod';

// Form schema
export const formSchema = z.object({
  // Step 1: Basic Info
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  age: z.coerce.number().min(1, { message: "Age is required" }).max(120, { message: "Please enter a valid age" }),
  gender: z.enum(["male", "female", "other"]),
  
  // Step 2: Body Metrics
  height: z.coerce.number().min(1, { message: "Height is required" }),
  heightUnit: z.enum(["cm", "in"]),
  weight: z.coerce.number().min(1, { message: "Weight is required" }),
  weightUnit: z.enum(["kg", "lb"]),
  
  // Step 3: Lifestyle
  goodSleepQuality: z.enum(["yes", "no"]),
  exerciseMinutes: z.coerce.number().min(0).max(60),
  smokingStatus: z.enum(["never", "former", "current"]).optional(),
  alcoholUnits: z.coerce.number().min(0).optional(),
  
  // Step 4: Health Status - Updated to use text-based severity levels for remaining conditions
  heartRelatedLevel: z.enum(["none", "mild", "moderate", "severe"]),
  cancerLevel: z.enum(["none", "mild", "moderate", "severe"]),
  othersLevel: z.enum(["none", "mild", "moderate", "severe"]),
  stressLevel: z.enum(["none", "mild", "high"]),
  heartRate: z.coerce.number().min(0).optional(),
  hba1c: z.coerce.number().min(0).optional(),
  systolicBP: z.coerce.number().min(0).optional(),
  diastolicBP: z.coerce.number().min(0).optional(),
});

export type FitnessFormValues = z.infer<typeof formSchema>;
