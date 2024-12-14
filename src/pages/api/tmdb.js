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

		let allMovies = [];
		let page = 1;
		let totalPages = 1; // Se actualiza después de la primera llamada

		while (page <= totalPages) {
			// Llamada a la API de TMDb para obtener las películas filtradas
			const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=es-ES&primary_release_year=${year}&vote_average.gte=${ratingThreshold}&vote_count.gte=${votesCountThreshold}&sort_by=vote_average.desc&page=${page}`);
			const data = await res.json();

			allMovies = [...allMovies, ...data.results];
			totalPages = data.total_pages; // Actualiza el total de páginas tras la primera llamada
			page += 1; // Incrementa el número de página
		}

		// Guardar las películas filtradas en la base de datos
		for (const movie of allMovies) {
			await saveMovie(movie);
		}

		return new Response(JSON.stringify({ success: true, movies: allMovies }), {
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
