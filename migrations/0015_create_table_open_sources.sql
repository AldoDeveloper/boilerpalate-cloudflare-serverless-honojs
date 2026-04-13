CREATE TABLE open_sources (
  id TEXT PRIMARY KEY,
  project_name TEXT NOT NULL,
  repo_url TEXT NOT NULL,
  description TEXT,
  stars INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_open_sources_repo_url ON open_sources(repo_url);
