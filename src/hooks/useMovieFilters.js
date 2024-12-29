import { $movieFilters, defaultMovieFilters } from '../stores/movies';
import useStoreState from "./useStoreState";

export const useMovieFilters = () => {
	const movieFilters = useStoreState($movieFilters, defaultMovieFilters);
	return [
		movieFilters,
		(movieFilters) => $movieFilters.set(movieFilters)
	]
}