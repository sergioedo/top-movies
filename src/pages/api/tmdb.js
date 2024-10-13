import fetch from 'node-fetch';  // Importación para ESM
import { saveMovie } from '../../lib/turso.js';

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(context) {
	// Lógica de tu API para obtener las películas de TMDb
	try {
	  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.TMDB_API_KEY}`);
	  const data = await res.json();
  
	  // Aquí podrías guardar los datos en la base de datos Turso, si es necesario
	  // Ejemplo de guardado de datos:
	  for (const movie of data.results) {
		await saveMovie(movie);  // saveMovie está en tu archivo turso.js
	  }
  
	  return new Response(JSON.stringify({ success: true, movies: data.results }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	  });
	} catch (error) {
	  return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { 'Content-Type': 'application/json' },
	  });
	}
  }
  
