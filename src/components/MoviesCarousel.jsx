
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { MovieCard } from './MovieCard'
import YearMoviesCard from "./YearMoviesCard"

export const MoviesCarousel = ({ movies }) => {
	return (
		<Carousel
			showArrows={true}
			centerMode={false}
			showThumbs={false}
			showIndicators={movies.length <= 10}
		>
			{movies && movies.map(movie => <MovieCard key={movie.id} client:visible initialMovie={movie} />)}
		</Carousel >
	)
}

export const YearMoviesCarousel = ({ topMoviesByYear, totalMoviesByYear }) => {
	return (
		<Carousel
			showArrows={true}
			centerMode={false}
			showThumbs={false}
			showIndicators={topMoviesByYear.length <= 10}
		>
			{topMoviesByYear && topMoviesByYear.map(yearMovies => <YearMoviesCard
				yearMovies={yearMovies}
				totalMovies={totalMoviesByYear[yearMovies.year]} />)}
		</Carousel >
	)
}