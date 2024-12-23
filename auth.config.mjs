import Google from '@auth/core/providers/google';
import { defineConfig } from 'auth-astro';

export default defineConfig({
	providers: [
		Google({
			clientId: import.meta.env.GOOGLE_CLIENT_ID,
			clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: import.meta.env.AUTH_SECRET,
	trustHost: true, // Confía en el host proporcionado por Vercel
	redirectProxyUrl: import.meta.env.AUTH_URL + '/api/auth',
	cookies: {
		sessionToken: {
			name: "auth.session-token",
			options: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
				sameSite: "strict",
				path: "/",
			},
		},
	},
});