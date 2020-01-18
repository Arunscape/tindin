DROP DATABASE IF EXISTS tindin;
CREATE DATABASE tindin;
USE tindin;


CREATE TABLE IF NOT EXISTS users (
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname TEXT,
  email TEXT NOT NULL,
  bio TEXT
);

CREATE TABLE IF NOT EXISTS photos (
  uid INT,
  url TEXT,
  direction DECIMAL,
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS validations (
  uid INT,
  slug VARCHAR(37),
  isUsed TEXT,
  PRIMARY KEY (uid, slug),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS swipes (
  swiper INT,
  swipee INT,
  direction DECIMAL,
  PRIMARY KEY (swiper, swipee),
  FOREIGN KEY (swiper) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (swipee) REFERENCES users(uid) ON DELETE CASCADE
);
