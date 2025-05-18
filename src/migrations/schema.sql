
-- Table for user profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  email TEXT UNIQUE NOT NULL,
  birth_date DATE,
  phone TEXT,
  address TEXT,
  emergency_contact_id UUID,
  subscription_tier TEXT,
  subscription_status TEXT
);

-- Table for emergency contacts
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  is_primary BOOLEAN DEFAULT FALSE
);

-- Table for fitness calculations
CREATE TABLE IF NOT EXISTS fitness_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  height NUMERIC NOT NULL,
  weight NUMERIC NOT NULL,
  age INTEGER NOT NULL,
  activity_level TEXT NOT NULL,
  medical_conditions TEXT[],
  score NUMERIC NOT NULL,
  recommendations TEXT[]
);

-- Table for medicines
CREATE TABLE IF NOT EXISTS medicines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  notes TEXT
);

-- Table for appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT,
  notes TEXT,
  reminder_set BOOLEAN DEFAULT FALSE
);

-- Table for vitals
CREATE TABLE IF NOT EXISTS vitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blood_pressure TEXT,
  heart_rate NUMERIC,
  blood_sugar NUMERIC,
  temperature NUMERIC,
  oxygen_level NUMERIC,
  recorded_date DATE NOT NULL
);

-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Set up RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fitness_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create policies for emergency_contacts
CREATE POLICY "Users can view their own emergency contacts" 
  ON emergency_contacts FOR SELECT 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own emergency contacts" 
  ON emergency_contacts FOR INSERT 
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own emergency contacts" 
  ON emergency_contacts FOR UPDATE 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own emergency contacts" 
  ON emergency_contacts FOR DELETE 
  USING (auth.uid() = profile_id);

-- Create policies for fitness_calculations
CREATE POLICY "Users can view their own fitness calculations" 
  ON fitness_calculations FOR SELECT 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own fitness calculations" 
  ON fitness_calculations FOR INSERT 
  WITH CHECK (auth.uid() = profile_id);

-- Create policies for medicines
CREATE POLICY "Users can view their own medicines" 
  ON medicines FOR SELECT 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own medicines" 
  ON medicines FOR INSERT 
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own medicines" 
  ON medicines FOR UPDATE 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own medicines" 
  ON medicines FOR DELETE 
  USING (auth.uid() = profile_id);

-- Create policies for appointments
CREATE POLICY "Users can view their own appointments" 
  ON appointments FOR SELECT 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own appointments" 
  ON appointments FOR INSERT 
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own appointments" 
  ON appointments FOR UPDATE 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own appointments" 
  ON appointments FOR DELETE 
  USING (auth.uid() = profile_id);

-- Create policies for vitals
CREATE POLICY "Users can view their own vitals" 
  ON vitals FOR SELECT 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own vitals" 
  ON vitals FOR INSERT 
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own vitals" 
  ON vitals FOR UPDATE 
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own vitals" 
  ON vitals FOR DELETE 
  USING (auth.uid() = profile_id);
