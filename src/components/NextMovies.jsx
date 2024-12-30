import { useCallback } from 'react';
import { useUserMovies } from '../hooks/useUserMovies';
import { MovieCard } from './MovieCard';

const isVisible = (movie) => ["UNKNOWN"].includes(movie.status)

const NextMovies = ({ initialNextMovies = [] }) => {
	const { nextUserMovies } = useUserMovies({ initialNextMovies });
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
			{nextUserMovies && nextUserMovies.map(movie => <MovieCard client:visible key={movie.id} initialMovie={{ ...movie, status: "UNKNOWN", visible: true }} isVisible={isVisible} />)}
		</div>
	)
}

export default NextMovies
