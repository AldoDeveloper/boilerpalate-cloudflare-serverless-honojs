CREATE TABLE educations (
  id TEXT PRIMARY KEY, -- UUID

  institution_name TEXT NOT NULL,

  education_level TEXT CHECK (
    education_level IN (
      'high_school',     -- SMA / SMK~
      'diploma',         -- D3
      'bachelor',        -- S1
      'master',          -- S2
      'doctorate',       -- S3
      'bootcamp',
      'course'
    )
  ),

  major TEXT, -- jurusan (nullable untuk SMA umum)

  start_date TEXT, -- YYYY-MM-DD
  end_date TEXT, -- nullable
  is_current INTEGER DEFAULT 0,

  grade TEXT, -- nilai / IPK / rata-rata

  description TEXT,

  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);