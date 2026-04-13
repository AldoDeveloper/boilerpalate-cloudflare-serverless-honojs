CREATE TABLE skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('backend', 'frontend', 'devops', 'database', 'mobile', 'other')),
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  description TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_skills_name_category ON skills(name, category);
