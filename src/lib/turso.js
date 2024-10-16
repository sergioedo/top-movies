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

export async function saveMovie(movie) {
  const { id, title, release_date, vote_average, overview, poster_path } = movie;
  await client.execute(`
    INSERT INTO movies (id, title, release_date, rating, overview, poster_path)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [id, title, release_date, vote_average, overview, poster_path]);
}
