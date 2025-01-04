import { useState, useCallback, useEffect } from 'react'
import { MovieCard } from './MovieCard'
import { useMovieFilters } from "hooks/useMovieFilters"
import { useUserMovies } from "hooks/useUserMovies"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { init } from 'astro/virtual-modules/prefetch.js'

const returnTrue = () => true

const MoviesCarrousel = ({ initialMovies = [] }) => {
	const [movies, setMovies] = useState(initialMovies)
	const { userMovies, getUserMovies } = useUserMovies()
	const [movieFilters,] = useMovieFilters()

	useEffect(() => {
		setMovies(initialMovies.filter(movie => {
			const userMovie = getUserMovies().find((m) => m.id === movie.id);
			return ["UNKNOWN"].includes(userMovie?.status || 'UNKNOWN') || !movieFilters?.showPendingMovies
		}))
	}, [movieFilters, userMovies, getUserMovies])

	console.log({ movies })
	return (
		<Carousel
			showArrows={true}
			centerMode={false}
			showThumbs={false}
			showIndicators={movies.length <= 10}
		>
			{movies && movies.map(movie => <MovieCard key={movie.id} client:visible initialMovie={{ ...movie, status: "UNKNOWN", visible: true }} />)}
		</Carousel >
	)
}

export default MoviesCarrousel
