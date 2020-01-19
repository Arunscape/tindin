DROP DATABASE IF EXISTS tindin;
CREATE DATABASE tindin;
USE tindin;


CREATE TABLE IF NOT EXISTS users (
  uid BIGINT PRIMARY KEY,
  uname TEXT,
  email TEXT NOT NULL,
  bio TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  u_to BIGINT,
  u_from BIGINT,
  msg TEXT NOT NULL,
  time DATE,
  FOREIGN KEY (u_to) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (u_from) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS photos (
  uid BIGINT,
  url TEXT,
  direction DECIMAL,
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS validations (
  slug BIGINT,
  uid BIGINT,
  timeout BIGINT,
  isUsed BOOLEAN,
  PRIMARY KEY (slug),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS swipes (
  swiper BIGINT,
  swipee BIGINT,
  direction DECIMAL,
  PRIMARY KEY (swiper, swipee),
  FOREIGN KEY (swiper) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (swipee) REFERENCES users(uid) ON DELETE CASCADE
);

INSERT INTO users (uid, uname, bio, email) VALUES
  (1, "Jacob", "Coolest", "jacob@reckhard.ca"),
  (2, "Peter", "Coolish", "pelliott@ualberta.ca"),
  (3, "Arun", "Cool", "awoosare@ualberta.ca");
