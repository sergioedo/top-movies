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

export async function getAllMovies() {
	const query = `
		SELECT 
			id,
			title, 
			strftime('%Y', release_date) as year, 
			release_date,
			rating, 
			poster_path
		FROM movies
		ORDER BY year DESC, rating DESC, id
	`;
	const { rows } = await client.execute(query, []);
	return rows;
}

export async function getTopMoviesByYear(numTop = 1) {
	const query = `
	  SELECT id, title, year, release_date, rating, poster_path
		FROM (
		SELECT 
			id,
			title, 
			strftime('%Y', release_date) as year, 
			release_date,
			rating, 
			poster_path, 
			ROW_NUMBER() OVER (PARTITION BY strftime('%Y', release_date) ORDER BY rating DESC) AS ranking
		FROM movies
		) AS ranked_movies
		WHERE ranking <= ?
		ORDER BY year DESC, rating DESC
	`;

	const { rows } = await client.execute(query, [numTop]);

	// Agrupar las películas por año
	const moviesByYear = rows.reduce((acc, movie) => {
		const { year } = movie;
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push({
			...movie
		});
		return acc;
	}, {});

	return Object.keys(moviesByYear).map(year => ({ year, movies: moviesByYear[year] })).sort((a, b) => b.year - a.year);
}

export async function getTotalMoviesByYear() {
	const query = `
	SELECT     
  		strftime('%Y', release_date) as year, 
  		count(*) as count
	FROM movies
	GROUP BY year
	ORDER BY year DESC
	`;

	const { rows } = await client.execute(query, []);

	const totalMoviesByYear = rows.reduce((acc, curr) => {
		const { year, count } = curr;
		acc[year] = count;
		return acc;
	}, {});

	return totalMoviesByYear;
}

export async function getBestMoviesByYear(year, minRating = 7) {
	const query = `
	  SELECT id, title, release_date, rating, overview, poster_path, CAST(strftime('%Y', release_date) as integer) as year
	  FROM movies
	  WHERE strftime('%Y', release_date) = ? AND rating >= ?
	  ORDER BY rating DESC
	`;

	const { rows } = await client.execute(query, [year, minRating]);
	return rows;
}

export async function saveMovie(movie) {
	const { id, title, release_date, vote_average, overview, poster_path, genre_ids } = movie;
	await client.execute(`
    INSERT INTO movies (id, title, release_date, rating, overview, poster_path, genre_ids)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [id, title, release_date, vote_average, overview, poster_path, JSON.stringify(genre_ids)]);
}

export async function saveUserMovie(movieId, userEmail, status) {
	await client.execute(
		`INSERT INTO user_movies (user_email, movie_id, status)
		VALUES (?, ?, ?)
		ON CONFLICT(user_email, movie_id) DO UPDATE SET status = excluded.status, updated_at = CURRENT_TIMESTAMP`,
		[userEmail, movieId, status]
	);
}

export async function getUserMovies(userEmail) {
	const query = `
		SELECT um.movie_id as id, um.status, um.updated_at, CAST(strftime('%Y', m.release_date) as integer) as year
		FROM user_movies um
		LEFT JOIN movies m ON um.movie_id = m.id
		WHERE user_email = ?`;
	const { rows } = await client.execute(query, [userEmail]);
	return rows;
}

export async function getNextUserMovies(userEmail, genre_ids) {
	const userFilter = `LEFT JOIN user_movies um on m.id=um.movie_id
						WHERE (um.status IS NULL OR um.status NOT IN ('WATCHED', 'DISCARD') AND um.user_email = ?)`
	const genreFilter = `EXISTS (
    					SELECT 1 FROM json_each(m.genre_ids) 
    					WHERE json_each.value IN (${genre_ids?.join(",")})
						)`
	const query = `
		SELECT m.id, m.title, m.release_date, m.rating, m.overview, m.poster_path, CAST(strftime('%Y', m.release_date) as integer) as year
	  	FROM movies m
  		${userEmail ? userFilter : ''}
		${userEmail && genre_ids ? ' AND ' : genre_ids ? 'WHERE ' : ''}
		${genre_ids ? genreFilter : ''}
		ORDER BY m.rating desc
		LIMIT 50`;
	const { rows } = await client.execute(query, userEmail ? [userEmail] : []);
	return rows;
}