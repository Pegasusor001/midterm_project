DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  address VARCHAR(255),
  latitude DECIMAL,
  longitude DECIMAL,
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255)
);
