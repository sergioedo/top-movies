import { createClient } from '@libsql/client';

// Usar import.meta.env para acceder a las variables de entorno en Astro
const client = createClient({
	url: import.meta.env.TURSO_DB_URL,  // Correcto acceso a la variable de entorno
	authToken: import.meta.env.TURSO_DB_AUTH_TOKEN,  // Correcto acceso a la variable de entorno
});

export async function createMoviesTable() {
	await client.execute(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY,
      title TEXT,
      release_date TEXT,
      rating REAL,
      overview TEXT,
      poster_path TEXT
    );
  `);
}

// Función para borrar las películas de un año en particular
export async function deleteMoviesByYear(year) {
	await client.execute(`
	  DELETE FROM movies WHERE strftime('%Y', release_date) = ?
	`, [year.toString()]);
}

export async function getBestMoviesByYear(year, minRating = 7) {
	const query = `
	  SELECT id, title, release_date, rating, overview, poster_path
	  FROM movies
	  WHERE strftime('%Y', release_date) = ? AND rating >= ?
	  ORDER BY rating DESC
	`;

	const { rows } = await client.execute(query, [year, minRating]);
	return rows;
}

export async function saveMovie(movie) {
	const { id, title, release_date, vote_average, overview, poster_path } = movie;
	await client.execute(`
    INSERT INTO movies (id, title, release_date, rating, overview, poster_path)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [id, title, release_date, vote_average, overview, poster_path]);
}

