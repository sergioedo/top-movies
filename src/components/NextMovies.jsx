
import React, { useState, useEffect } from "react";
import { useStore } from '@nanostores/react';
import { $nextUserMovies } from '../stores/movies';

const MovieCard = ({ movie }) => {
	const movieUrL = `/movies/${movie.id}`
	const imgUrl = movie.poster_url ? movie.poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
	const imgStyle = ['WATCHED', 'DISCARD'].includes(movie.status) ? 'grayscale' : 'grayscale-0'

	return (
		<div className="mt-8">
			<div className="relative">
				<a href={movieUrL} className="block relative z-10">
					<img src={imgUrl}
						alt={`${movie.title} Poster`}
						className={`thumbnail hover:opacity-75 transition ease-in-out duration-300 ${['WATCHED', 'DISCARD'].includes(movie.status) ? 'grayscale' : 'grayscale-0'}`}
						id={`movie-poster-${movie.id}`}
					/>
				</a>
			</div>

			<div className="mt-2">
				<a href={movieUrL}
					className="text-lg mt-2 hover:text-gray-300"
				>{movie.title}</a>
				<div className="flex items-center text-gray-400 text-sm mt-1">
					<svg className="fill-current text-yellow-500 w-4" viewBox="0 0 24 24"
					><g dataname="Layer 2"
					><path
						d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
						dataname="star"></path></g						></svg>
					<span className="ml-1">{Math.round(movie.rating * 10) / 10}</span>
					<span className="mx-2">|</span>
					<span>{movie.release_date}</span>
				</div>
				<div className="text-gray-400 text-sm">{movie.genres}</div>
			</div>
		</div>
	)
}

const NextMovies = ({ initialNextMovies = [] }) => {
	const storedNextMovies = useStore($nextUserMovies);
	// https://github.com/nanostores/persistent/issues/26
	const [nextMovies, setNextMovies] = useState(initialNextMovies);
	useEffect(() => {
		if (storedNextMovies) {
			setNextMovies(storedNextMovies)
		}
	}, [storedNextMovies])
	console.log({ nextMovies, storedNextMovies });
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
			{nextMovies && nextMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
		</div>
	)
}

export default NextMovies