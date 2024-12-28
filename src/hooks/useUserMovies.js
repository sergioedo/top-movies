import { $nextUserMovies } from '../stores/movies';
import useStoreState from "./useStoreState";

export const useUserMovies = ({ initialNextMovies = [] }) => {
	const nextUserMovies = useStoreState($nextUserMovies, initialNextMovies);
	return {
		nextUserMovies
	}
}