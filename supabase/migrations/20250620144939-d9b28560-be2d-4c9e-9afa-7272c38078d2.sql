
-- Create a comprehensive anonymous wellness calculations table
CREATE TABLE IF NOT EXISTS public.anonymous_wellness_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Information
  name TEXT,
  email TEXT,
  phone TEXT,
  age INTEGER NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  
  -- Body Metrics
  height NUMERIC NOT NULL,
  weight NUMERIC NOT NULL,
  height_unit TEXT NOT NULL CHECK (height_unit IN ('cm', 'in')),
  weight_unit TEXT NOT NULL CHECK (weight_unit IN ('kg', 'lb')),
  
  -- Lifestyle Data
  exercise_minutes INTEGER,
  good_sleep_quality BOOLEAN,
  smoking_status TEXT CHECK (smoking_status IN ('never', 'former', 'current')),
  alcohol_units INTEGER,
  stress_level TEXT CHECK (stress_level IN ('none', 'mild', 'high')),
  
  -- Optional Health Metrics
  heart_rate INTEGER,
  systolic_bp INTEGER,
  diastolic_bp INTEGER,
  hba1c NUMERIC,
  
  -- Medical Conditions (slider values 0-100)
  diabetes_level INTEGER CHECK (diabetes_level >= 0 AND diabetes_level <= 100),
  hypertension_level INTEGER CHECK (hypertension_level >= 0 AND hypertension_level <= 100),
  heart_related_level INTEGER CHECK (heart_related_level >= 0 AND heart_related_level <= 100),
  cancer_level INTEGER CHECK (cancer_level >= 0 AND cancer_level <= 100),
  others_level INTEGER CHECK (others_level >= 0 AND others_level <= 100),
  
  -- Results
  calculated_score INTEGER NOT NULL,
  recommendations JSONB, -- Store array of recommendation objects
  normalized_values JSONB, -- Store the breakdown values
  
  -- Metadata
  calculation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_token TEXT, -- Optional: for linking to sessions if needed
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for basic privacy
ALTER TABLE public.anonymous_wellness_calculations ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy for anonymous access (since it's anonymous data)
CREATE POLICY "Allow anonymous wellness calculations" 
  ON public.anonymous_wellness_calculations 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create an index on calculation_date for better query performance
CREATE INDEX idx_anonymous_wellness_calculation_date 
  ON public.anonymous_wellness_calculations(calculation_date);

-- Create an index on session_token if we want to group by session
CREATE INDEX idx_anonymous_wellness_session_token 
  ON public.anonymous_wellness_calculations(session_token) 
  WHERE session_token IS NOT NULL;
