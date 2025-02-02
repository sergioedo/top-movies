import { useState, useCallback, useEffect } from 'react'
import { FiltrableMovieCard, MovieCard } from './MovieCard'
import { useMovieFilters } from "hooks/useMovieFilters"
import { useUserMovies } from "hooks/useUserMovies"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { MoviesCarousel } from './MoviesCarousel'

const returnTrue = () => true

export const MoviesList = ({ initialMovies = [] }) => {
	const [movies, setMovies] = useState(initialMovies)
	const { userMovies, getUserMovies } = useUserMovies()
	const [movieFilters,] = useMovieFilters()

	useEffect(() => {
		setMovies(initialMovies.filter(movie => {
			const userMovie = getUserMovies().find((m) => m.id === movie.id);
			return ["UNKNOWN"].includes(userMovie?.status || 'UNKNOWN') || !movieFilters?.showPendingMovies
		}))
	}, [movieFilters, userMovies, getUserMovies])

	return (
		<div>
			{/* Desktop */}
			<div className="hidden md:block" >
				<div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
					{
						initialMovies.map((movie) => (
							<FiltrableMovieCard
								key={movie.id}
								client:visible
								initialMovie={movie}
							/>
						))
					}
				</div>
			</div >
			{/* Mobile */}
			<div className="block md:hidden" >
				<MoviesCarousel client:visible movies={movies} />
			</div>
		</div>
	)
}

export const NextMoviesList = ({ initialNextMovies = [], next = 5 }) => {
	const [movies, setMovies] = useState(initialNextMovies.slice(0, next))
	const { userMovies, nextUserMovies } = useUserMovies({ initialNextMovies: initialNextMovies.slice(0, next) })
	useEffect(() => {
		setMovies(nextUserMovies
			.slice(0, next)
			.map((movie) => ({
				status: "UNKNOWN",
				visible: true,
				...movie,
			})))
	}, [userMovies, nextUserMovies])

	return (
		<div>
			{/* Desktop */}
			<div className="hidden md:block" >
				<div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
					{
						movies.map((movie) => (
							<MovieCard
								key={movie.id}
								client:visible
								initialMovie={movie}
							/>
						))
					}
				</div>
			</div >
			{/* Mobile */}
			<div className="block md:hidden" >
				<MoviesCarousel client:visible movies={movies} />
			</div>
		</div>
	)
}
