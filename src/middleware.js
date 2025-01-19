import { getSession } from 'auth-astro/server';

const isProtectedPath = (path) => {
	//API: /api, excepts /api/auth (public validation)
	if (path.startsWith('/api') && !path.startsWith('/api/auth')) return true;
	// Admin page
	if (path.startsWith('/admin')) return true;
	return false;
}

export async function onRequest(context, next) {

	const urlObject = new URL(context.url);
	const path = urlObject.pathname;

	const session = await getSession(context.request);
	if (isProtectedPath(path) && !session) {
		return new Response("Unauthorized: Missing or invalid session", { status: 401 });
	}
	if (session) {
		//TODO: validate expiration, renew...
		context.locals.user = session.user;
	}
	return next();
}
