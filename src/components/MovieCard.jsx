import { useMovieFilters } from "hooks/useMovieFilters"
import { useUserMovies } from "hooks/useUserMovies"
import { useCallback, useEffect, useState } from "react"
import Stamp from "./Stamp";
import { DiscardButton, UndoButton, WatchedButton } from "./icons/StatusButtons";


const statusBorderColors = {
	"WATCHED": "border-green-300",
	"DISCARD": "border-red-300",
	"UNDO": "border-slate-400",
};

export const StatusButton = ({ status, showStatus, actionStatus, iconStatus, opacity, size, onChangeStatus }) => {
	const handleClick = () => {
		if (actionStatus && onChangeStatus) {
			onChangeStatus(actionStatus)
		}
	}
	return (
		<button
			id={`watched-button-${showStatus}-${size ? size : "big"}`}
			className={`bg-slate-600 ${actionStatus ? "hover:bg-slate-700" : ""} border-2 ${statusBorderColors[iconStatus]} ${opacity ? "opacity-90 hover:opacity-100" : ""} text-white font-bold ${size === "small" ? "p-2" : "p-4"} rounded-full m-2 ${actionStatus ? "pointer-events-auto" : ""} transition ease-in-out duration-300 ${showStatus.includes(status) ? '' : 'hidden'}`}
			onClick={handleClick}
			type="button"
		>
			{
				iconStatus === "WATCHED" && (
					<WatchedButton size={size} />
				)
			}
			{
				iconStatus === "DISCARD" && (
					<DiscardButton size={size} />
				)
			}
			{
				iconStatus === 'UNDO' && (
					<UndoButton size={size} />
				)
			}
		</button >
	)
}

const MovieImage = ({ movie }) => {
	const imgUrl = movie.poster_url ? movie.poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
	return (
		<img
			src={imgUrl}
			alt={`${movie.title} Poster`}
			className={`hover:opacity-75 transition ease-in-out duration-300 ${['WATCHED', 'DISCARD'].includes(movie.status) ? 'grayscale' : 'grayscale-0'} rounded-2xl border-[1px] border-slate-800`}
			id={`movie-poster-${movie.id}`}
		/>
	)
}

const MovieDetail = ({ movie }) => {
	const movieUrL = `/movies/${movie.id}`
	return (
		<div className="mt-2 mb-8">
			<a href={movieUrL}
				className="text-lg mt-2 hover:text-gray-300"
			>{movie.title}</a>
			<div className="flex items-center justify-center text-gray-400 text-sm mt-1">
				<svg className="fill-current text-yellow-500 w-4" viewBox="0 0 24 24"
				><g dataname="Layer 2"
				><path
					d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
					dataname="star"></path></g						></svg>
				<span className="ml-1">{Math.round((movie.rating || 0) * 10) / 10}</span>
				<span className="mx-2">|</span>
				<span>{movie.release_date}</span>
			</div>
			<div className="text-gray-400 text-sm">{movie.genres}</div>

			{/* <!-- Overview --> */}
			<div className="mt-4 p-2 flex-1 justify-center hidden md:block">
				<p className="text-sm text-gray-300 line-clamp-5">
					{movie.overview ? movie.overview : "No hay descripción disponible."}
				</p>
			</div>
		</div>
	)
}

const returnTrue = () => true
export const MovieCard = ({ initialMovie, isVisible = returnTrue, fullDetail = false }) => {
	const [movie, setMovie] = useState(initialMovie)
	const { userMovies, getUserMovies, updateMovieStatus } = useUserMovies()

	useEffect(() => {
		const userMovie = getUserMovies().find((m) => m.id === movie.id);
		if (userMovie) {
			setMovie({
				...movie,
				...userMovie,
				visible: isVisible({ status: 'UNKNOWN', ...movie, ...userMovie }),
			})
		}
	}, [userMovies, getUserMovies, isVisible])

	const handleStatusChange = useCallback((newStatus) => {
		updateMovieStatus(movie.id, newStatus, movie.year)
	}, [movie, updateMovieStatus])

	const movieUrL = `/movies/${movie.id}`

	return (
		<div className={`transparent ${movie.visible ? '' : 'hidden'}`}>
			<div className="flex flex-col md:flex-row h-full">
				{/* Caratula */}
				<div className={`relative ${fullDetail ? 'md:w-1/2' : ''}`}>
					<a href={movieUrL} className="block relative">
						<MovieImage movie={movie} />
					</a>
					<div className="absolute top-0 flex items-center justify-center text-white text-md p-1 m-4 bg-slate-800 rounded-lg opacity-90">
						<svg className="fill-current text-yellow-500 w-4" viewBox="0 0 24 24"
						><g dataname="Layer 2"
						><path
							d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
							dataname="star"></path></g						></svg>
						<span className="ml-1">{Math.round((movie.rating || 0) * 10) / 10}</span>
						{/* <span className="mx-2">|</span> */}
						{/* <span>{movie.release_date}</span> */}
					</div>

					<div className="absolute top-0 right-0 flex items-center justify-center text-white text-md p-1 m-4 bg-slate-800 rounded-lg opacity-90">
						<span>{movie.release_date?.split('-')[0]}</span>
					</div>

					{["WATCHED", "DISCARD"].includes(movie.status) &&
						<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center text-white text-md">
							<Stamp text={movie.status === 'WATCHED' ? 'YA LA HE VISTO!' : 'NO LA QUIERO VER'} color={movie.status === 'WATCHED' ? 'green' : 'red'} />
						</div>
					}

					{/* <!-- Botones flotantes en la parte inferior --> */}
					<div
						className="absolute inset-x-0 bottom-0 flex justify-center gap-8 md:gap-4 mb-4 px-4 py-4 pointer-events-none"
					>
						<StatusButton
							status={movie.status}
							iconStatus="WATCHED"
							actionStatus="WATCHED"
							onChangeStatus={handleStatusChange}
							showStatus={["UNKNOWN"]}
							opacity={true}
						/>
						<StatusButton
							status={movie.status}
							iconStatus="UNDO"
							actionStatus="UNKNOWN"
							onChangeStatus={handleStatusChange}
							showStatus={["WATCHED", "DISCARD"]}
							opacity={true}
						/>
						<StatusButton
							status={movie.status}
							iconStatus="DISCARD"
							actionStatus="DISCARD"
							onChangeStatus={handleStatusChange}
							showStatus={["UNKNOWN"]}
							opacity={true}
						/>
					</div>
				</div>
				{/* Ficha/Detalle */}
				{/* <div className={`${fullDetail ? 'md:w-1/2' : ''} rounded-r-lg`}>
					<MovieDetail movie={movie} />
				</div> */}
			</div>
		</div>
	)
}

export const FiltrableMovieCard = ({ initialMovie }) => {
	const [movieFilters,] = useMovieFilters()
	const isVisible = useCallback((movie) => ["UNKNOWN"].includes(movie.status) || !movieFilters?.showPendingMovies, [movieFilters])
	return <MovieCard initialMovie={initialMovie} isVisible={isVisible} />
}