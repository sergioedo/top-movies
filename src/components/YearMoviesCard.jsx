import { YearCircleProgress } from "./CircleProgress";

const YearMoviesCard = ({ yearMovies, totalMovies }) => {
	const { year, movies } = yearMovies;
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
		<div class="flex items-center justify-center transparent relative" >
			{/* Contenedor de los posters y círculo*/}
			<div class="grid grid-cols-2 grid-rows-2 gap-0">
				{
					movies.map((movie, idx) => (
						<a href={`/movies/${movie.id}`} key={movie.id} id={movie.id}>
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={`${movie.title} Poster`}
								class={`thumbnail hover:opacity-75 transition ease-in-out duration-150 ${roundedCorners[idx]}`}
							/>
						</a>
					))
				}
			</div>
			{/* Círculo con año y barra de progreso */}
			<YearCircleProgress
				client:visible
				year={Number(year)}
				totalYearMovies={totalMovies}
				initialStats={initialYearStats}
			/>
		</div>
	)
}

export default YearMoviesCard