DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS points CASCADE;
DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  image_url VARCHAR(255)
);

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  is_public BOOLEAN,
  is_favourite BOOLEAN,
  image_url VARCHAR(255),
  start_latitude DECIMAL NOT NULL DEFAULT 51.505,
  start_longitude DECIMAL NOT NULL DEFAULT -0.09,
  description TEXT
);

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
