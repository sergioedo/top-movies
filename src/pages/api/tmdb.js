import fetch from 'node-fetch';
import { saveMovie, deleteMoviesByYear } from '../../lib/turso.js';

const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;

export async function GET({ request }) {
	const searchParams = new URL(request.url).searchParams;

	// Obtener el año actual por defecto
	const currentYear = new Date().getFullYear();

	// Usar el año actual si no se ha especificado en los query params
	const year = searchParams.get('year') || currentYear;
	console.log({ year })
	const ratingThreshold = searchParams.get('rating') || 7;
	const votesCountThreshold = searchParams.get('votes') || 1000;

	try {
		// Borrar las películas del año antes de insertar nuevas
		await deleteMoviesByYear(year);

		// Llamada a la API de TMDb para obtener las películas filtradas
		const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&primary_release_year=${year}&vote_average.gte=${ratingThreshold}&vote_count.gte=${votesCountThreshold}&sort_by=vote_average.desc`);
		const data = await res.json();

		// Guardar las películas filtradas en la base de datos
		for (const movie of data.results) {
			await saveMovie(movie);
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
