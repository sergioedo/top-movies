import { verifyGoogleTokenManual } from "./lib/auth";

export async function onRequest(context, next) {
	console.log('context:', JSON.stringify(context));

	const urlObject = new URL(context.url);
	const path = urlObject.pathname;

	// Protected Paths: /api, excepts /api/token (public validation)
	if (path.startsWith('/api') && !path.startsWith('/api/token')) {
		const authHeader = context.request.headers.get("Authorization");

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return new Response("Unauthorized: Missing or invalid token", { status: 401 });
		}

		const idToken = authHeader.split("Bearer ")[1];

		try {
			const token = await verifyGoogleTokenManual(idToken);
			context.locals.user = token; // Pasar el usuario al contexto para su uso posterior
			console.log('user:', context.locals.users);
			// Llamar al siguiente middleware o ruta
			return next();
		} catch (error) {
			console.error("Error verificando el token:", error);
			return new Response("Unauthorized: Invalid token", { status: 401 });
		}
	} else {
		return next();
	}
}
