import { $movies, $nextUserMovies, getUserMovies, updateMovieStatus, getYearMoviesStats, getAllMoviesStats } from '../stores/movies';
import useStoreState from "./useStoreState";

export const useUserMovies = (props = { initialNextMovies: [] }) => {
	const userMovies = useStoreState($movies, []);
	const nextUserMovies = useStoreState($nextUserMovies, props.initialNextMovies);
	return {
		userMovies,
		nextUserMovies,
		getUserMovies,
		updateMovieStatus,
		getAllMoviesStats,
		getYearMoviesStats
	}
}