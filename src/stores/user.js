import { onMount } from 'nanostores'
import { persistentAtom } from '@nanostores/persistent'

const storageEncoding = {
	encode: JSON.stringify,
	decode: JSON.parse,
}
export const anonymousUser = {
	email: 'anonymous@gmail.com',
	image: 'https://avatar.iran.liara.run/public/13',
	name: 'anonymous'
}

export const $user = persistentAtom('nano-user', anonymousUser, storageEncoding)

export const setStoredUser = (user) => $user.set(user)
export const setAnonymousStoredUser = () => $user.set(anonymousUser)
export const isAnonymousUser = (user) => user && user?.email === anonymousUser.email

async function checkSession() {
	try {
		const response = await fetch("/api/auth/session", {
			method: "GET",
			credentials: "include",
		});
		if (response.ok) {
			const session = await response.json();
			setStoredUser(session?.user);
		} else {
			setAnonymousStoredUser();
		}
	} catch (error) {
		console.error("Error al comprobar la sesión:", error);
	}
}

onMount($user, () => {
	// Mount mode
	console.log('onMount', $user)
	checkSession();
	return () => {
		// Disabled mode
	}
})