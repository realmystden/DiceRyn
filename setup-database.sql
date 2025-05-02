-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  icon TEXT NOT NULL,
  required_languages TEXT[] DEFAULT NULL,
  required_frameworks TEXT[] DEFAULT NULL,
  required_databases TEXT[] DEFAULT NULL,
  required_combination TEXT[] DEFAULT NULL,
  required_consistency INTEGER DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  achievement_id UUID REFERENCES achievements(id) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  badge_id UUID REFERENCES badges(id) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Create completed_projects table
CREATE TABLE IF NOT EXISTS completed_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  frameworks TEXT[] NOT NULL,
  databases TEXT[] NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger to create profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some default badges
INSERT INTO badges (name, description, image_url) VALUES
('First Achievement', 'Earned your first achievement', '/badges/first-achievement.png'),
('Achievement Collector', 'Earned 5 achievements', '/badges/achievement-collector.png'),
('Achievement Master', 'Earned 10 achievements', '/badges/achievement-master.png'),
('JavaScript Guru', 'Completed 5 JavaScript projects', '/badges/javascript-guru.png'),
('React Expert', 'Completed 5 React projects', '/badges/react-expert.png'),
('Database Wizard', 'Used 3 different databases in your projects', '/badges/database-wizard.png'),
('Full Stack Developer', 'Completed projects with frontend and backend technologies', '/badges/fullstack-developer.png'),
('Consistent Coder', 'Completed projects on 5 consecutive days', '/badges/consistent-coder.png');

-- Insert some default achievements
INSERT INTO achievements (title, description, level, icon, required_languages, required_frameworks) VALUES
('JavaScript Novice', 'Complete your first JavaScript project', 'Student', '🌟', ARRAY['JavaScript'], NULL),
('React Beginner', 'Complete your first React project', 'Trainee', '⚛️', NULL, ARRAY['React']),
('Database Explorer', 'Use your first database in a project', 'Trainee', '🗄️', NULL, NULL),
('Full Stack Initiate', 'Complete a project with both frontend and backend', 'Junior', '🔄', NULL, NULL),
('Consistent Learner', 'Complete projects on 3 consecutive days', 'Junior', '📆', NULL, NULL),
('JavaScript Master', 'Complete 10 JavaScript projects', 'Senior', '🏆', ARRAY['JavaScript'], NULL),
('Framework Expert', 'Use 3 different frameworks in your projects', 'Senior', '🛠️', NULL, NULL),
('Database Guru', 'Use 3 different databases in your projects', 'Master', '🧙‍♂️', NULL, NULL),
('Polyglot Programmer', 'Complete projects in 5 different programming languages', 'Master', '🌐', NULL, NULL);
