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
  direction FLOAT,
  PRIMARY KEY (swiper, swipee)
);

INSERT INTO users (uid, uname, bio, email) VALUES
  (1, "Jacob", "Coolest", "jacob@reckhard.ca"),
  (2, "Peter", "Coolish", "pelliott@ualberta.ca"),
  (3, "Arun", "I use Arch Linux, btw", "awoosare@ualberta.ca"),
  (4, "Christiana", "Birds are dinosaurs!", "garros@ualberta.ca");

INSERT INTO photos (uid, url) VALUES
  (1, "https://discoverystocks.com/wp-content/uploads/2017/11/ALRT-iStock-610041376-640x427.jpg"),
  (2, "https://i.pinimg.com/originals/33/e6/b5/33e6b5d7a53ce82292132ba5ebb1135e.jpg"),
  (3, "https://i.kym-cdn.com/photos/images/original/001/258/245/48f.png"),
  (4, "https://pbs.twimg.com/profile_images/544394403/A-1024__Custom__400x400.jpg");
