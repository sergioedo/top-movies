import fetch from 'node-fetch';
import { /*verifyGoogleTokenAuto,*/ verifyGoogleTokenManual } from 'lib/auth';

export async function POST({ request }) {
	const { idToken } = await request.json();

	try {
		// const token = await verifyGoogleTokenAuto(idToken);
		const token = await verifyGoogleTokenManual(idToken);
		return new Response(JSON.stringify({ message: "Autenticado correctamente", user: token }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}
}
