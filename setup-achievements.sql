-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  criteria JSONB NOT NULL,
  badge_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  rarity TEXT NOT NULL,
  achievement_id UUID REFERENCES achievements(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key from achievements to badges
ALTER TABLE achievements 
ADD CONSTRAINT fk_achievement_badge 
FOREIGN KEY (badge_id) REFERENCES badges(id);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create user_badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Update completed_projects table to include app_type
ALTER TABLE completed_projects 
ADD COLUMN IF NOT EXISTS app_type TEXT DEFAULT 'Other';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON user_badges(badge_id);
CREATE INDEX IF NOT EXISTS idx_completed_projects_user_id ON completed_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_projects_level ON completed_projects(level);
CREATE INDEX IF NOT EXISTS idx_completed_projects_app_type ON completed_projects(app_type);
CREATE INDEX IF NOT EXISTS idx_achievements_level ON achievements(level);
CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);
CREATE INDEX IF NOT EXISTS idx_badges_rarity ON badges(rarity);

-- Insert meaningful badges for significant achievements
INSERT INTO badges (id, name, description, image_url, rarity) VALUES
-- Legendary badges (very rare, significant accomplishments)
('b001', 'Master Developer', 'Complete 50 projects across all levels', '/badges/master-developer.png', 'legendary'),
('b002', 'Polyglot Programmer', 'Complete projects in 10 different programming languages', '/badges/polyglot.png', 'legendary'),
('b003', 'Full Stack Virtuoso', 'Master both frontend and backend development', '/badges/fullstack-virtuoso.png', 'legendary'),
('b004', 'Coding Marathon Champion', 'Complete 10 projects in a single day', '/badges/marathon-champion.png', 'legendary'),
('b005', '100 Days of Code', 'Complete projects on 100 consecutive days', '/badges/100-days.png', 'legendary'),

-- Epic badges (rare, impressive accomplishments)
('b006', 'Framework Maestro', 'Use 10 different frameworks in your projects', '/badges/framework-maestro.png', 'epic'),
('b007', 'Database Architect', 'Use 7 different databases in your projects', '/badges/database-architect.png', 'epic'),
('b008', 'Senior Developer', 'Complete 25 projects including 8 Senior level projects', '/badges/senior-developer.png', 'epic'),
('b009', 'Consistent Coder', 'Complete projects on 30 consecutive days', '/badges/consistent-coder.png', 'epic'),
('b010', 'Technology Explorer', 'Complete projects using 20 different technologies', '/badges/tech-explorer.png', 'epic'),

-- Rare badges (uncommon, notable accomplishments)
('b011', 'JavaScript Ninja', 'Complete 15 JavaScript projects', '/badges/js-ninja.png', 'rare'),
('b012', 'Python Master', 'Complete 15 Python projects', '/badges/python-master.png', 'rare'),
('b013', 'React Architect', 'Complete 15 React projects', '/badges/react-architect.png', 'rare'),
('b014', 'Junior Developer', 'Complete 15 projects including 5 Junior level projects', '/badges/junior-developer.png', 'rare'),
('b015', 'Weekend Warrior', 'Complete 10 projects during weekends', '/badges/weekend-warrior.png', 'rare'),
('b016', 'Night Owl', 'Complete 10 projects between 10 PM and 5 AM', '/badges/night-owl.png', 'rare'),

-- Uncommon badges (moderately difficult accomplishments)
('b017', 'Trainee Graduate', 'Complete 10 projects including 3 Trainee level projects', '/badges/trainee-graduate.png', 'uncommon'),
('b018', 'Language Explorer', 'Complete projects in 5 different programming languages', '/badges/language-explorer.png', 'uncommon'),
('b019', 'Framework Explorer', 'Use 5 different frameworks in your projects', '/badges/framework-explorer.png', 'uncommon'),
('b020', 'Database Explorer', 'Use 3 different databases in your projects', '/badges/database-explorer.png', 'uncommon'),
('b021', 'Weekly Coder', 'Complete 5 projects in a single week', '/badges/weekly-coder.png', 'uncommon'),
('b022', 'Early Bird', 'Complete 5 projects between 5 AM and 9 AM', '/badges/early-bird.png', 'uncommon'),

-- Common badges (basic accomplishments)
('b023', 'First Project', 'Complete your first project', '/badges/first-project.png', 'common'),
('b024', 'Student Graduate', 'Complete 5 Student level projects', '/badges/student-graduate.png', 'common'),
('b025', 'JavaScript Beginner', 'Complete 5 JavaScript projects', '/badges/js-beginner.png', 'common'),
('b026', 'Python Beginner', 'Complete 5 Python projects', '/badges/python-beginner.png', 'common'),
('b027', 'React Beginner', 'Complete 5 React projects', '/badges/react-beginner.png', 'common'),
('b028', 'Three Day Streak', 'Complete projects on 3 consecutive days', '/badges/three-day-streak.png', 'common'),
('b029', 'Easter Egg Hunter', 'Discover a hidden easter egg', '/badges/easter-egg.png', 'common');

-- Insert achievements and link them to badges
INSERT INTO achievements (id, title, description, level, icon, category, points, criteria, badge_id) VALUES
-- Legendary achievements
('a001', 'Master Developer', 'Complete 50 projects across all levels', 'Master', '👑', 'General', 1000, '{"type":"project_count","count":50}', 'b001'),
('a002', 'Polyglot Programmer', 'Complete projects in 10 different programming languages', 'Master', '🌐', 'Languages', 1000, '{"type":"language","count":1,"languages":["JavaScript","Python","Java","C#","PHP","Ruby","Go","Swift","Kotlin","TypeScript","Rust","C++","C"]}', 'b002'),
('a003', 'Full Stack Virtuoso', 'Master both frontend and backend development', 'Master', '🧰', 'Development', 1000, '{"type":"combination","count":10,"languages":["JavaScript","TypeScript","Python","Java","PHP"],"frameworks":["React","Angular","Vue","Next.js","Express","Django","Spring","Laravel"]}', 'b003'),
('a004', 'Coding Marathon Champion', 'Complete 10 projects in a single day', 'Master', '🏃', 'Consistency', 1000, '{"type":"special","special_condition":"marathon"}', 'b004'),
('a005', '100 Days of Code', 'Complete projects on 100 consecutive days', 'Master', '📆', 'Consistency', 1000, '{"type":"streak","streak_days":100}', 'b005'),

-- Epic achievements
('a006', 'Framework Maestro', 'Use 10 different frameworks in your projects', 'Senior', '🛠️', 'Frameworks', 500, '{"type":"framework","count":1,"frameworks":["React","Angular","Vue","Next.js","Express","Django","Spring","Laravel","Flutter","Svelte","Ruby on Rails","ASP.NET"]}', 'b006'),
('a007', 'Database Architect', 'Use 7 different databases in your projects', 'Senior', '💾', 'Databases', 500, '{"type":"database","count":1,"databases":["MySQL","PostgreSQL","MongoDB","SQLite","Redis","Firebase","DynamoDB","Cassandra","Oracle","SQL Server"]}', 'b007'),
('a008', 'Senior Developer', 'Complete 25 projects including 8 Senior level projects', 'Senior', '🚀', 'General', 500, '{"type":"level","count":8,"levels":["Senior"]}', 'b008'),
('a009', 'Consistent Coder', 'Complete projects on 30 consecutive days', 'Senior', '⏰', 'Consistency', 500, '{"type":"streak","streak_days":30}', 'b009'),
('a010', 'Technology Explorer', 'Complete projects using 20 different technologies', 'Senior', '🔍', 'General', 500, '{"type":"special","special_condition":"tech_diversity"}', 'b010'),

-- Rare achievements
('a011', 'JavaScript Ninja', 'Complete 15 JavaScript projects', 'Junior', '🥷', 'Languages', 250, '{"type":"language","count":15,"languages":["JavaScript"]}', 'b011'),
('a012', 'Python Master', 'Complete 15 Python projects', 'Junior', '🐍', 'Languages', 250, '{"type":"language","count":15,"languages":["Python"]}', 'b012'),
('a013', 'React Architect', 'Complete 15 React projects', 'Junior', '⚛️', 'Frameworks', 250, '{"type":"framework","count":15,"frameworks":["React"]}', 'b013'),
('a014', 'Junior Developer', 'Complete 15 projects including 5 Junior level projects', 'Junior', '💻', 'General', 250, '{"type":"level","count":5,"levels":["Junior"]}', 'b014'),
('a015', 'Weekend Warrior', 'Complete 10 projects during weekends', 'Junior', '🏋️', 'Consistency', 250, '{"type":"special","special_condition":"weekend"}', 'b015'),
('a016', 'Night Owl', 'Complete 10 projects between 10 PM and 5 AM', 'Junior', '🦉', 'Consistency', 250, '{"type":"time_of_day","count":10,"time_range":"night"}', 'b016'),

-- Uncommon achievements
('a017', 'Trainee Graduate', 'Complete 10 projects including 3 Trainee level projects', 'Trainee', '🌱', 'General', 100, '{"type":"level","count":3,"levels":["Trainee"]}', 'b017'),
('a018', 'Language Explorer', 'Complete projects in 5 different programming languages', 'Trainee', '📚', 'Languages', 100, '{"type":"language","count":1,"languages":["JavaScript","Python","Java","C#","PHP","Ruby","Go","Swift","Kotlin","TypeScript"]}', 'b018'),
('a019', 'Framework Explorer', 'Use 5 different frameworks in your projects', 'Trainee', '🧩', 'Frameworks', 100, '{"type":"framework","count":1,"frameworks":["React","Angular","Vue","Next.js","Express","Django","Spring","Laravel","Flutter"]}', 'b019'),
('a020', 'Database Explorer', 'Use 3 different databases in your projects', 'Trainee', '🗄️', 'Databases', 100, '{"type":"database","count":1,"databases":["MySQL","PostgreSQL","MongoDB","SQLite","Redis","Firebase"]}', 'b020'),
('a021', 'Weekly Coder', 'Complete 5 projects in a single week', 'Trainee', '📅', 'Consistency', 100, '{"type":"special","special_condition":"weekly"}', 'b021'),
('a022', 'Early Bird', 'Complete 5 projects between 5 AM and 9 AM', 'Trainee', '🐦', 'Consistency', 100, '{"type":"time_of_day","count":5,"time_range":"morning"}', 'b022'),

-- Common achievements
('a023', 'First Project', 'Complete your first project', 'Student', '🏆', 'General', 50, '{"type":"project_count","count":1}', 'b023'),
('a024', 'Student Graduate', 'Complete 5 Student level projects', 'Student', '🎓', 'General', 50, '{"type":"level","count":5,"levels":["Student"]}', 'b024'),
('a025', 'JavaScript Beginner', 'Complete 5 JavaScript projects', 'Student', '📜', 'Languages', 50, '{"type":"language","count":5,"languages":["JavaScript"]}', 'b025'),
('a026', 'Python Beginner', 'Complete 5 Python projects', 'Student', '🐍', 'Languages', 50, '{"type":"language","count":5,"languages":["Python"]}', 'b026'),
('a027', 'React Beginner', 'Complete 5 React projects', 'Student', '⚛️', 'Frameworks', 50, '{"type":"framework","count":5,"frameworks":["React"]}', 'b027'),
('a028', 'Three Day Streak', 'Complete projects on 3 consecutive days', 'Student', '🔥', 'Consistency', 50, '{"type":"streak","streak_days":3}', 'b028'),
('a029', 'Easter Egg Hunter', 'Discover a hidden easter egg', 'Student', '🥚', 'Special', 50, '{"type":"special","special_condition":"easter_egg"}', 'b029');
