DROP TABLE movies;
CREATE TABLE IF NOT EXISTS movies (
	id INTEGER PRIMARY KEY,
	title TEXT,
	release_date TEXT,
	rating REAL,
	overview TEXT,
	poster_path TEXT
);

DROP TABLE user_movies;
CREATE TABLE IF NOT EXISTS user_movies (
  movie_id INTEGER NOT NULL,
  user_email TEXT NOT NULL,
  status TEXT CHECK(status IN ('UNKNOWN', 'WATCHED', 'DISCARD')) DEFAULT 'UNKNOWN' NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (user_email, movie_id)
  --FOREIGN KEY (movie_id) REFERENCES movies (id)
);