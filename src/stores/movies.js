import { persistentAtom, persistentMap } from '@nanostores/persistent'
import { $user, anonymousUser, isAnonymousUser } from './user'
import { computed, task } from 'nanostores'

const storageEncoding = {
	encode: JSON.stringify,
	decode: (value) => (value && JSON.parse(value)) || [],
}

// User Movies
export const $movies = persistentMap('nano-movies:', {
	[anonymousUser.email]: []
}, storageEncoding)

export const getUserMovies = () => $movies.get()[$user.get()?.email] || []

export const updateMovieStatus = async (movieId, newStatus, year) => {
	let movies = getUserMovies()
	// Find movie to add or update
	if (movies.find((m) => m.id === movieId)) {
		movies = movies.map((movie) =>
			movie.id === movieId ? { ...movie, status: newStatus } : movie
		);
	} else {
		movies = [
			...movies,
			{ id: movieId, status: newStatus, year },
		];
	}
	// Save on localstorage
	$movies.setKey($user.get()?.email, movies)

	// Save user movie (server)
	if (!isAnonymousUser($user.get())) {
		const response = await fetch("/api/user/movies/" + movieId, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				movieId,
				status: newStatus,
			}),
		});
	}
}

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

// Next movies
export const $nextUserMovies = computed([$user, $movies], user => task(async () => {
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
				return nextUserMovies.slice(0, 10);
			}
		}
	} catch {
		// ERROR: cannot get nextUserMovies
	}
}))

// User Movie Statistics
const getMoviesStats = (movies, totalMoviesCount) => {
	const seenMoviesCount = movies.filter(
		(m) => m.status === "WATCHED"
	).length;
	const discardMoviesCount = movies.filter(
		(m) => m.status === "DISCARD"
	).length;
	const seenPercentage = Math.round(
		(seenMoviesCount / totalMoviesCount) * 100
	);
	const discardPercentage = Math.round(
		(discardMoviesCount / totalMoviesCount) * 100
	);
	return {
		seenMoviesCount,
		discardMoviesCount,
		unseenMoviesCount:
			totalMoviesCount - seenMoviesCount - discardMoviesCount,
		seenPercentage,
		discardPercentage,
		unseenPercentage: 100 - seenPercentage - discardPercentage,
	};
}

export const getYearMoviesStats = (year, yearMoviesCount) => {
	const yearMovies = getUserMovies().filter((m) => m.year === year) || [];
	return getMoviesStats(yearMovies, yearMoviesCount);
}
export const getAllMoviesStats = (totalMoviesCount) => {
	return getMoviesStats(getUserMovies(), totalMoviesCount);
}

// Movie Filters:
export const defaultMovieFilters = {
	showPendingMovies: true
}
export const $movieFilters = persistentAtom('nano-movie-filters', defaultMovieFilters, storageEncoding)