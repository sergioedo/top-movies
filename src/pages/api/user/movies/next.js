import { getNextUserMovies } from '@libs/turso';

export async function GET({ locals }) {
	const userEmail = locals?.user?.email;

	if (!userEmail) {
		return new Response(
			JSON.stringify({ error: "EL usuario es obligatorio" }),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}

	try {
		const movies = (await getNextUserMovies(userEmail)).map((movie) => ({
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
