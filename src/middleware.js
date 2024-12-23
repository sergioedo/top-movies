import { getSession } from 'auth-astro/server';

const isProtectedPath = (path) => {
	//API: /api, excepts /api/token (public validation)
	if (path.startsWith('/api') && !path.startsWith('/api/auth')) return true;
	if (path.startsWith('/admin')) return true;
	return false;
}

export async function onRequest(context, next) {

	const urlObject = new URL(context.url);
	const path = urlObject.pathname;

	if (isProtectedPath(path)) {
		const session = await getSession(context.request);
		console.log('session', JSON.stringify(session))

		if (!session) {
			return new Response("Unauthorized: Missing or invalid session", { status: 401 });
		}

		//TODO: validate expiration, renew...
		context.locals.user = session.user;
		return next();
	} else {
		return next();
	}
}
