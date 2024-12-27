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
	trustHost: true, // trust host on Vercel
	redirectProxyUrl: import.meta.env.AUTH_URL + '/api/auth', // required to redirect correctly on Vercel (by default appears internal server port)
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
			// Force AUTH_URL as callbackUrl, fallback is not working --> this save the correct cookie value, used in the flow
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