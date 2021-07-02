-- Users table seeds here (Example)
INSERT INTO users (name, email) VALUES ('Alice', 'Alice@email.com');
INSERT INTO users (name, email) VALUES ('Lun', 'Lun@email.com');
INSERT INTO users (name, email) VALUES ('James', 'James@email.com');

INSERT INTO maps (user_id, title, is_public, is_favourite, start_latitude, start_longitude, description)
VALUES (1, 'London', TRUE, FALSE, 51.505, -0.09, 'This is London');
INSERT INTO maps (user_id, title, is_public, is_favourite, start_latitude, start_longitude, description)
VALUES (2, 'Vancouver', TRUE, FALSE, 49.282, -123.12, 'This is Vancouver');
INSERT INTO maps (user_id, title, is_public, is_favourite, start_latitude, start_longitude, description)
VALUES (2, 'Paris', TRUE, FALSE, 51.505, -0.09, 'This is Paris');
INSERT INTO maps (user_id, title, is_public, is_favourite, start_latitude, start_longitude, description)
VALUES (3, 'London', TRUE, FALSE, 48.856, 2.352, 'This is London');
INSERT INTO maps (user_id, title, is_public, is_favourite, start_latitude, start_longitude, description)
VALUES (3, 'BeiJing', TRUE, FALSE, 39.904, 116.407, 'This is BeiJing');

INSERT INTO points (user_id, map_id, address, latitude, longitude, title, description, image_url)
VALUES (1, 1, 'address', 51.405, -0.09, 'Shop1', 'this is shop1', 'imageURL');
INSERT INTO points (user_id, map_id, address, latitude, longitude, title, description, image_url)
VALUES (1, 1, 'address', 51.605, -0.09, 'Shop1', 'this is shop1', 'imageURL');
INSERT INTO points (user_id, map_id, address, latitude, longitude, title, description, image_url)
VALUES (1, 1, 'address', 51.505, 0.01, 'Shop1', 'this is shop1', 'imageURL');
