-- Create user role enum
CREATE TYPE user_role AS ENUM ('student', 'mentor');

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create mentor_profiles table
CREATE TABLE mentor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  company TEXT,
  field_of_work TEXT NOT NULL,
  bio TEXT NOT NULL,
  career_insights TEXT,
  years_of_experience INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on mentor_profiles
ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;

-- Mentor profiles policies
CREATE POLICY "Mentor profiles are viewable by everyone"
  ON mentor_profiles FOR SELECT
  USING (true);

CREATE POLICY "Mentors can insert their own profile"
  ON mentor_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'mentor')
  );

CREATE POLICY "Mentors can update their own profile"
  ON mentor_profiles FOR UPDATE
  USING (
    auth.uid() = user_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'mentor')
  );

-- Create mentor_requests table
CREATE TABLE mentor_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, mentor_id)
);

-- Enable RLS on mentor_requests
ALTER TABLE mentor_requests ENABLE ROW LEVEL SECURITY;

-- Mentor requests policies
CREATE POLICY "Users can view their own requests"
  ON mentor_requests FOR SELECT
  USING (auth.uid() = student_id OR auth.uid() = mentor_id);

CREATE POLICY "Students can create requests"
  ON mentor_requests FOR INSERT
  WITH CHECK (
    auth.uid() = student_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'student')
  );

CREATE POLICY "Mentors can update requests sent to them"
  ON mentor_requests FOR UPDATE
  USING (
    auth.uid() = mentor_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'mentor')
  );

-- Create feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on feedback
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Feedback policies
CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentor_profiles_updated_at
  BEFORE UPDATE ON mentor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentor_requests_updated_at
  BEFORE UPDATE ON mentor_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();