DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  is_public BOOLEAN,
  is_favourite BOOLEAN,
  start_latitude DECIMAL NOT NULL DEFAULT 51.505,
  start_longitude DECIMAL NOT NULL DEFAULT -0.09,
  image_url VARCHAR(255),
  description TEXT,
);

