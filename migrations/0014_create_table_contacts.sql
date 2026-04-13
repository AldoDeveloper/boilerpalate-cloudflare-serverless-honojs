CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  type TEXT CHECK (type IN ('github', 'linkedin', 'email', 'twitter', 'instagram', 'website', 'other')),
  url TEXT NOT NULL,
  label TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_contacts_type ON contacts(type);
