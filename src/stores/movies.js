import { persistentMap } from '@nanostores/persistent'
import { $user, anonymousUser, isAnonymousUser } from './user'
import { computed, task } from 'nanostores'

const storageEncoding = {
	encode: JSON.stringify,
	decode: (value) => (value && JSON.parse(value)) || [],
}

export const $movies = persistentMap('nano-movies:', {
	[anonymousUser.email]: []
}, storageEncoding)

export const $nextUserMovies = computed($user, user => task(async () => {
	try {
		if (!isAnonymousUser(user)) {
			const response = await fetch("/api/user/movies/next", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // Asegúrate de incluir cookies
			});

			if (response.ok) {
				const nextUserMovies = await response.json();
				return nextUserMovies.slice(0, 5);
			}
		}
	} catch {
		// ERROR: cannot get nextUserMovies
	}
}))

$user.listen(async (currentUser, previousUser) => {
	if (!isAnonymousUser(previousUser)) {
		$movies.setKey(previousUser?.email, []) //clear movies from previous user
	}
	if (!isAnonymousUser(currentUser)) {
		const response = await fetch("/api/user/movies", {
			method: "GET",
			credentials: "include",
		});

		if (response.ok) {
			const userMovies = await response.json();
			$movies.setKey(currentUser?.email, userMovies)
		}
	}
})