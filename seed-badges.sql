-- Insert example badges for different achievements

-- Beginner badges
INSERT INTO public.badges (name, description, icon, category, rarity)
VALUES 
('First Roll', 'Generated your first project idea', '🎲', 'activity', 'common'),
('Explorer', 'Tried all dice types', '🧭', 'activity', 'uncommon'),
('Project Starter', 'Completed your first project', '🚀', 'projects', 'common'),
('Early Bird', 'Created an account in the first month of launch', '🐦', 'special', 'rare');

-- Streak badges
INSERT INTO public.badges (name, description, icon, category, rarity)
VALUES 
('Dedicated', 'Used DiceRyn for 7 days in a row', '🔥', 'streak', 'uncommon'),
('Committed', 'Used DiceRyn for 30 days in a row', '💪', 'streak', 'rare'),
('Unstoppable', 'Used DiceRyn for 100 days in a row', '⚡', 'streak', 'legendary');

-- Project badges
INSERT INTO public.badges (name, description, icon, category, rarity)
VALUES 
('Beginner', 'Completed 5 beginner projects', '🌱', 'projects', 'common'),
('Intermediate', 'Completed 5 intermediate projects', '🌿', 'projects', 'uncommon'),
('Advanced', 'Completed 5 advanced projects', '🌳', 'projects', 'rare'),
('Expert', 'Completed 5 expert projects', '🏆', 'projects', 'epic'),
('Full Stack', 'Completed projects with both frontend and backend', '⚙️', 'specialization', 'uncommon');

-- Tech stack badges
INSERT INTO public.badges (name, description, icon, category, rarity)
VALUES 
('React Master', 'Completed 10 projects with React', '⚛️', 'technology', 'epic'),
('Vue Voyager', 'Completed 10 projects with Vue', '🟢', 'technology', 'epic'),
('Angular Ace', 'Completed 10 projects with Angular', '🔴', 'technology', 'epic'),
('Node Ninja', 'Completed 10 projects with Node.js', '🟩', 'technology', 'epic'),
('Python Pro', 'Completed 10 projects with Python', '🐍', 'technology', 'epic');

-- Database badges
INSERT INTO public.badges (name, description, icon, category, rarity)
VALUES 
('SQL Sorcerer', 'Completed 10 projects with SQL databases', '🗄️', 'database', 'epic'),
('Mongo Master', 'Completed 10 projects with MongoDB', '🍃', 'database', 'epic'),
('Firebase Fan', 'Completed 10 projects with Firebase', '🔥', 'database', 'epic');

-- Special badges
INSERT INTO public.badges (name, description, icon, category, rarity)
VALUES 
('Idea Machine', 'Generated 100 project ideas', '💡', 'activity', 'rare'),
('Project Machine', 'Completed 25 total projects', '🏭', 'projects', 'epic'),
('Full Spectrum', 'Completed at least one project for each framework', '🌈', 'specialization', 'legendary'),
('Jack of All Trades', 'Used all available frameworks and databases', '🃏', 'specialization', 'legendary'),
('Code Artist', 'Completed projects in all major categories', '🎨', 'achievement', 'legendary');
