CREATE TABLE experiences (
  id TEXT PRIMARY KEY, -- UUID disimpan sebagai TEXT

  company_name TEXT NOT NULL,
  position TEXT NOT NULL,

  employment_type TEXT CHECK (
    employment_type IN ('full_time', 'freelance', 'contract', 'internship')
  ),

  location TEXT,
  is_remote INTEGER DEFAULT 0, -- 0 = false, 1 = true

  start_date TEXT NOT NULL, -- format: YYYY-MM-DD
  end_date TEXT, -- nullable
  is_current INTEGER DEFAULT 0,

  description TEXT,

  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);