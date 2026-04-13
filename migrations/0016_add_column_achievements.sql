ALTER TABLE achievements ADD COLUMN issuer TEXT;
ALTER TABLE achievements ADD COLUMN certificate_url TEXT;
ALTER TABLE achievements ADD COLUMN image_url TEXT;
ALTER TABLE achievements ADD COLUMN category TEXT;
ALTER TABLE achievements ADD COLUMN status TEXT DEFAULT 'verified' CHECK(status IN ('verified', 'pending', 'in-progress'));
