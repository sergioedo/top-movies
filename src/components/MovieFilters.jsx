import { useMovieFilters } from "hooks/useMovieFilters";

const MovieFilters = () => {
	const [movieFilters, setMovieFilters] = useMovieFilters()
	const { showPendingMovies } = movieFilters
	console.log({ showPendingMovies })
	const handleFilterPendings = () => {
		setMovieFilters({
			...movieFilters,
			showPendingMovies: !showPendingMovies
		})
	};
	return (
		<label className="flex items-center">
			<span className="mr-2 text-white text-xm">
				{showPendingMovies ? 'Pendientes' : 'Todas'}
			</span>
			<div className={`w-10 h-6 rounded-full shadow-inner flex items-center transition-all cursor-pointer ${showPendingMovies ? 'bg-red-600' : 'bg-gray-300'}`} onClick={handleFilterPendings}>
				<div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${showPendingMovies ? 'translate-x-5' : 'translate-x-1'}`}>
				</div>
			</div>
		</label>
	)
}

export default MovieFilters
