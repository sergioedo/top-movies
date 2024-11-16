DROP TABLE movies;
CREATE TABLE IF NOT EXISTS movies (
	id INTEGER PRIMARY KEY,
	title TEXT,
	release_date TEXT,
	rating REAL,
	overview TEXT,
	poster_path TEXT
);