import { saveUserMovie } from '../../../../lib/turso.js';

export async function POST({ params, request }) {
	const movieId = params.id;
	const { userEmail, status } = await request.json();

	if (!userEmail || !movieId || !status) {
		return new Response(
			JSON.stringify({ error: "Parámetros incompletos" }),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}

	try {
		await saveUserMovie(movieId, userEmail, status);

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error al actualizar el estado:", error);
		return new Response(
			JSON.stringify({ error: "Error interno del servidor" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
