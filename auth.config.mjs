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
	// trustHost: true, // Confía en el host proporcionado por Vercel
	// redirectProxyUrl: import.meta.env.AUTH_URL + '/api/auth',
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
	callbacks: {
		async redirect({ url, baseUrl }) {
			// Force AUTH_URL, fallback is not working
			console.log({ url, baseUrl });
			const authURL = import.meta.env.AUTH_URL;
			return authURL;
			// Default:
			/*
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`

			// Allows callback URLs on the same origin
			if (new URL(url).origin === baseUrl) return url

			return baseUrl
			*/
		}
	}
});