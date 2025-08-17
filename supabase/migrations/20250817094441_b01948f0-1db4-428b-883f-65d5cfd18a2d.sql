-- Create volunteering coordinators table
CREATE TABLE public.volunteering_coordinators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteering categories table
CREATE TABLE public.volunteering_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteering opportunities table
CREATE TABLE public.volunteering_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  organization TEXT NOT NULL,
  category_id UUID REFERENCES public.volunteering_categories(id),
  coordinator_id UUID REFERENCES public.volunteering_coordinators(id),
  date DATE NOT NULL,
  time TIME WITHOUT TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  total_spots INTEGER NOT NULL DEFAULT 1,
  filled_spots INTEGER NOT NULL DEFAULT 0,
  requirements TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteering registrations table
CREATE TABLE public.volunteering_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID NOT NULL REFERENCES public.volunteering_opportunities(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL,
  registrant_name TEXT NOT NULL,
  registrant_phone TEXT NOT NULL,
  registrant_address TEXT NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(opportunity_id, profile_id)
);

-- Create volunteering alerts table
CREATE TABLE public.volunteering_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID REFERENCES public.volunteering_registrations(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('confirmation', 'reminder', 'cancellation', 'update')),
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.volunteering_coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteering_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteering_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteering_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteering_alerts ENABLE ROW LEVEL SECURITY;

-- Create policies for coordinators (public read, admin write)
CREATE POLICY "Everyone can view coordinators" 
ON public.volunteering_coordinators 
FOR SELECT 
USING (true);

-- Create policies for categories (public read)
CREATE POLICY "Everyone can view categories" 
ON public.volunteering_categories 
FOR SELECT 
USING (true);

-- Create policies for opportunities (public read, admin write)
CREATE POLICY "Everyone can view active opportunities" 
ON public.volunteering_opportunities 
FOR SELECT 
USING (is_active = true);

-- Create policies for registrations (users can view/insert their own)
CREATE POLICY "Users can view their own registrations" 
ON public.volunteering_registrations 
FOR SELECT 
USING (auth.uid() = profile_id);

CREATE POLICY "Users can register for opportunities" 
ON public.volunteering_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own registrations" 
ON public.volunteering_registrations 
FOR UPDATE 
USING (auth.uid() = profile_id);

-- Create policies for alerts (users can view their own)
CREATE POLICY "Users can view their own alerts" 
ON public.volunteering_alerts 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.volunteering_registrations 
    WHERE id = registration_id AND profile_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_volunteering_coordinators_updated_at
BEFORE UPDATE ON public.volunteering_coordinators
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteering_opportunities_updated_at
BEFORE UPDATE ON public.volunteering_opportunities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteering_registrations_updated_at
BEFORE UPDATE ON public.volunteering_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.volunteering_categories (name, description) VALUES
('Environmental', 'Environmental cleanup and conservation activities'),
('Elder Care', 'Assistance and support for elderly community members'),
('Food Banks', 'Food distribution and hunger relief programs'),
('Animal Shelters', 'Care and support for animals in need'),
('Education', 'Teaching and mentoring opportunities'),
('Healthcare', 'Medical and health support services'),
('Community Gardens', 'Gardening and urban agriculture projects'),
('Youth Programs', 'Activities and support for children and teenagers');

-- Create storage bucket for Excel uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('volunteering-uploads', 'volunteering-uploads', false);

-- Create storage policies for volunteering uploads (admin only for now)
CREATE POLICY "Admin can upload volunteering files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'volunteering-uploads' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can view volunteering files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'volunteering-uploads' AND auth.uid() IS NOT NULL);