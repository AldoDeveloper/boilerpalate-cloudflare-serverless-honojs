CREATE TABLE profiles (
  id TEXT PRIMARY KEY, -- UUID

  full_name TEXT NOT NULL,
  username TEXT UNIQUE,
  email TEXT,

  headline TEXT, 
  -- contoh: "Senior Backend Engineer | System Architect"

  bio TEXT,
  -- deskripsi singkat (ringkasan diri)

  avatar_url TEXT,
  resume_url TEXT,

  location TEXT,
  is_available INTEGER DEFAULT 1, -- open to work

  years_of_experience INTEGER,

  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);