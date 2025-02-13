import { YearCircleProgress } from "./CircleProgress";

const YearMoviesCard = ({ yearMovies, genre }) => {
	const { year, movies } = yearMovies;
	const totalMovies = movies.length;
	const initialYearStats = {
		seenMoviesCount: 0,
		seenPercentage: 0,
		discardMoviesCount: 0,
		discardPercentage: 0,
		unseenMoviesCount: totalMovies,
		unseenPercentage: 100,
	};
	const roundedCorners = ['rounded-tl-2xl', 'rounded-tr-2xl', 'rounded-bl-2xl', 'rounded-br-2xl']
	return (
		<div className="flex items-center justify-center transparent relative" >
			{/* Contenedor de los posters y círculo*/}
			<div className="grid grid-cols-2 grid-rows-2 gap-0">
				{
					movies.slice(0, 4).map((movie, idx) => (
						<a href={`/movies/${movie.id}`} key={movie.id} id={movie.id}>
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={`${movie.title} Poster`}
								className={`thumbnail hover:opacity-75 transition ease-in-out duration-150 ${roundedCorners[idx]}`}
							/>
						</a>
					))
				}
			</div>
			{/* Círculo con año y barra de progreso */}
			<YearCircleProgress
				client:visible
				year={Number(year)}
				yearMovies={movies}
				initialStats={initialYearStats}
				genre={genre}
			/>
		</div>
	)
}

export default YearMoviesCard