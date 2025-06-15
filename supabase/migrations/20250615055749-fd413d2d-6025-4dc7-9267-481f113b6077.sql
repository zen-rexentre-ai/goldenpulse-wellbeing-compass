
-- Phase 1: Anonymous Health Score Tables

-- Table for tracking anonymous user sessions
CREATE TABLE IF NOT EXISTS public.anonymous_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours'),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing health calculations for anonymous users
CREATE TABLE IF NOT EXISTS public.anonymous_health_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.anonymous_sessions(id) ON DELETE CASCADE,
  height NUMERIC NOT NULL,
  weight NUMERIC NOT NULL,
  height_unit TEXT NOT NULL CHECK (height_unit IN ('cm', 'ft')),
  weight_unit TEXT NOT NULL CHECK (weight_unit IN ('kg', 'lbs')),
  age INTEGER NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  exercise_minutes INTEGER,
  good_sleep_quality BOOLEAN,
  smoking_status TEXT CHECK (smoking_status IN ('never', 'former', 'current')),
  alcohol_units INTEGER,
  stress_level INTEGER,
  heart_rate INTEGER,
  systolic_bp INTEGER,
  diastolic_bp INTEGER,
  hba1c NUMERIC,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Normalized table for medical conditions tied to an anonymous calculation
CREATE TABLE IF NOT EXISTS public.anonymous_medical_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calculation_id UUID NOT NULL REFERENCES public.anonymous_health_calculations(id) ON DELETE CASCADE,
  condition_type TEXT NOT NULL CHECK (condition_type IN ('diabetes', 'hypertension', 'heart_related', 'cancer', 'others')),
  severity_level INTEGER NOT NULL CHECK (severity_level >= 0 AND severity_level <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Normalized table for recommendations tied to an anonymous calculation
CREATE TABLE IF NOT EXISTS public.anonymous_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calculation_id UUID NOT NULL REFERENCES public.anonymous_health_calculations(id) ON DELETE CASCADE,
  recommendation_text TEXT NOT NULL,
  impact TEXT NOT NULL,
  priority TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phase 2: RLS Policies and Security

-- Helper function to get session_id from a session_token passed in headers
-- This is used in RLS policies to scope data to the current anonymous session
CREATE OR REPLACE FUNCTION public.get_anonymous_session_id(p_session_token TEXT)
RETURNS UUID AS $$
DECLARE
  session_id UUID;
BEGIN
  SELECT id INTO session_id
  FROM public.anonymous_sessions
  WHERE session_token = p_session_token
    AND expires_at > NOW();

  -- Update last_activity for the session
  IF session_id IS NOT NULL THEN
    UPDATE public.anonymous_sessions
    SET last_activity = NOW()
    WHERE id = session_id;
  END IF;

  RETURN session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Enable RLS on all new tables
ALTER TABLE public.anonymous_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anonymous_health_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anonymous_medical_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anonymous_recommendations ENABLE ROW LEVEL SECURITY;

-- Policies for anonymous_sessions
CREATE POLICY "Anyone can create a session"
  ON public.anonymous_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view and update their own session"
  ON public.anonymous_sessions FOR SELECT
  USING (id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'));

CREATE POLICY "Users can update their own session"
  ON public.anonymous_sessions FOR UPDATE
  USING (id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'))
  WITH CHECK (id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'));

-- Policies for anonymous_health_calculations
CREATE POLICY "Users can create health calculations for their session"
  ON public.anonymous_health_calculations FOR INSERT
  WITH CHECK (session_id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'));

CREATE POLICY "Users can view health calculations for their session"
  ON public.anonymous_health_calculations FOR SELECT
  USING (session_id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'));


-- Policies for anonymous_medical_conditions
CREATE POLICY "Users can create conditions for their calculations"
  ON public.anonymous_medical_conditions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.anonymous_health_calculations
    WHERE id = calculation_id AND session_id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'))
  );

CREATE POLICY "Users can view conditions for their calculations"
  ON public.anonymous_medical_conditions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.anonymous_health_calculations
    WHERE id = calculation_id AND session_id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'))
  );

-- Policies for anonymous_recommendations
CREATE POLICY "Users can create recommendations for their calculations"
  ON public.anonymous_recommendations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.anonymous_health_calculations
    WHERE id = calculation_id AND session_id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'))
  );

CREATE POLICY "Users can view recommendations for their calculations"
  ON public.anonymous_recommendations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.anonymous_health_calculations
    WHERE id = calculation_id AND session_id = public.get_anonymous_session_id(current_setting('request.headers', true)::json->>'x-session-token'))
  );
