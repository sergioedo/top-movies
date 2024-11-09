import fetch from 'node-fetch';

export async function POST({ request }) {
	const { idToken } = await request.json();

	const googleClientID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;
	const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
	const tokenInfo = await response.json();

	if (tokenInfo.aud === googleClientID) {
		return new Response(JSON.stringify({ message: "Autenticado exitosamente", user: tokenInfo }), {
			status: 200,
		});
	} else {
		return new Response(JSON.stringify({ error: "Token inválido" }), {
			status: 401,
		});
	}
}
