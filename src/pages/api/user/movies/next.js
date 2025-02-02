import { getNextUserMovies } from '@libs/turso';
import { GENRE_IDS } from '@libs/genres';

export async function GET({ locals, request }) {
	const userEmail = locals?.user?.email;
	const url = new URL(request.url);
	const params = Object.fromEntries(url.searchParams.entries());
	const genre = params.genre;
	const genreIds = genre && GENRE_IDS[genre];

	if (!userEmail) {
		return new Response(
			JSON.stringify({ error: "EL usuario es obligatorio" }),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}

	try {
		const movies = (await getNextUserMovies(userEmail, genreIds)).map((movie) => ({
			...movie,
			status: "UNKNOWN",
			visible: true,
		}));

		return new Response(JSON.stringify(movies), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error al obtener películas:", error);
		return new Response(
			JSON.stringify({ error: "Error interno del servidor" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
