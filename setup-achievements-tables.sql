-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  level TEXT NOT NULL,
  required_projects INTEGER,
  required_languages TEXT[],
  required_frameworks TEXT[],
  required_databases TEXT[],
  required_app_types TEXT[],
  required_level_projects JSONB,
  required_consistency JSONB,
  required_combination JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  UNIQUE(user_id, achievement_id)
);

-- Create completed_projects table
CREATE TABLE IF NOT EXISTS completed_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  frameworks TEXT[] DEFAULT '{}',
  databases TEXT[] DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for user_achievements
CREATE POLICY "Users can view their own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own achievements"
  ON user_achievements FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for completed_projects
CREATE POLICY "Users can view their own completed projects"
  ON completed_projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own completed projects"
  ON completed_projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own completed projects"
  ON completed_projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own completed projects"
  ON completed_projects FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to check achievements when a project is completed
CREATE OR REPLACE FUNCTION check_achievements_on_project_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- This would be implemented with specific achievement logic
  -- For now, it's a placeholder for the database trigger
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check achievements when a project is completed
CREATE TRIGGER check_achievements_after_project_completion
AFTER INSERT ON completed_projects
FOR EACH ROW
EXECUTE FUNCTION check_achievements_on_project_completion();
