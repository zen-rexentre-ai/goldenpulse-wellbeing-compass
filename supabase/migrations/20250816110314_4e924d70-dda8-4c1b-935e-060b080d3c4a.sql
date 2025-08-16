-- Fix security warnings by setting search_path on functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    email, 
    preferred_language,
    onboarding_completed,
    onboarding_step,
    profile_completion_percentage
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    NEW.email,
    'en',
    FALSE,
    0,
    20  -- 20% completion after registration
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix cleanup function with proper search_path
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.user_sessions 
  WHERE expires_at < NOW() OR is_active = FALSE;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix anonymous session function with proper search_path  
CREATE OR REPLACE FUNCTION public.get_anonymous_session_id(p_session_token text)
RETURNS uuid AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;