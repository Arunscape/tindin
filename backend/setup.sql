DELETE TABLE IF EXISTS users;
DELETE TABLE IF EXISTS validations;
DELETE TABLE IF EXISTS swipes;

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
  PRIMARY KEY (uid, url),
  FOREIGN KEY uid REFERENCES users(uid)
);

CREATE TABLE IF NOT EXISTS validations (
  email TEXT,
  slug TEXT,
  isUsed TEXT,
  PRIMARY KEY (email, slug)
);

CREATE TABLE IF NOT EXISTS swipes (
  swiper INT,
  swipee INT,
  direction DECIMAL,
  PRIMARY KEY (swiper, swipee),
  FOREIGN KEY swiper REFERENCES users(uid),
  FOREIGN KEY swipee REFERENCES users(uid)
);
