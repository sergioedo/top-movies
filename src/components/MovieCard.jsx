import { useMovieFilters } from "hooks/useMovieFilters"
import { useUserMovies } from "hooks/useUserMovies"
import { useCallback, useEffect, useState } from "react"
import Stamp from "./Stamp";


const statusBorderColors = {
	"WATCHED": "border-green-300",
	"DISCARD": "border-red-300",
	"UNDO": "border-slate-400",
};

const StatusButton = ({ status, showStatus, actionStatus, iconStatus, opacity, size, onChangeStatus }) => {
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
					<svg
						viewBox="0 0 24 24"
						className={`stroke-green-600 ${size === "small" ? "w-8 h-8 md:w-6 md:h-6 lg:w-4 lg:h-4" : "w-16 h-16 md:w-8 md:h-8 lg:w-6 lg:h-6"}`}
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<>
							<g id="SVGRepo_bgCarrier" strokeWidth="0" />
							<g
								id="SVGRepo_tracerCarrier"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<g id="SVGRepo_iconCarrier">
								<g id="Interface / Check_Big">
									<path
										id="Vector"
										d="M4 12L8.94975 16.9497L19.5572 6.34326"
										stroke="current"
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
							</g>
						</>
					</svg>
				)
			}
			{
				iconStatus === "DISCARD" && (
					<svg
						className={`stroke-red-800 fill-red-600 ${size === "small" ? "w-8 h-8 md:w-6 md:h-6 lg:w-4 lg:h-4" : "w-16 h-16 md:w-8 md:h-8 lg:w-6 lg:h-6"}`}
						viewBox="0 0 32 32"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<>
							<g id="SVGRepo_bgCarrier" strokeWidth="0" />
							<g
								id="SVGRepo_tracerCarrier"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<g id="SVGRepo_iconCarrier">
								<title>cancel2</title>
								<path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z" />
							</g>
						</>
					</svg>
				)
			}
			{
				iconStatus === 'UNDO' && (
					<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
						className={`stroke-slate-800 ${size === "small" ? "w-8 h-8 md:w-6 md:h-6 lg:w-4 lg:h-4" : "w-16 h-16 md:w-8 md:h-8 lg:w-6 lg:h-6"}`}
						viewBox="0 0 32 32" xmlSpace="preserve" fill="#000000">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path fill="#111918" d="M29,18c0,3.472-1.353,6.737-3.808,9.193C22.736,29.648,19.472,31,16,31 c-3.473,0-6.737-1.353-9.192-3.808S3,21.472,3,18c0-1.104,0.896-2,2-2s2,0.896,2,2c0,2.403,0.937,4.664,2.636,6.364 C11.336,26.064,13.596,27,16,27c2.403,0,4.664-0.936,6.364-2.636C24.063,22.664,25,20.404,25,18s-0.937-4.664-2.636-6.364 C20.664,9.936,18.404,9,16,9h-2.172l1.586,1.586c0.781,0.781,0.781,2.047,0,2.828s-2.047,0.781-2.828,0l-5-5 c-0.781-0.781-0.781-2.047,0-2.828l5-5c0.781-0.781,2.047-0.781,2.828,0s0.781,2.047,0,2.828L13.828,5H16 c3.473,0,6.737,1.353,9.192,3.808C27.647,11.263,29,14.528,29,18z"></path>
						</g>
					</svg>
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
			className={`hover:opacity-75 transition ease-in-out duration-300 ${['WATCHED', 'DISCARD'].includes(movie.status) ? 'grayscale' : 'grayscale-0'} rounded-2xl`}
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
export const MovieCard = ({ initialMovie, isVisible = returnTrue, fullDetail }) => {
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
					<a href={movieUrL} className="block relative z-10">
						<MovieImage movie={movie} />
					</a>
					<div className="absolute top-0 z-10 flex items-center justify-center text-white text-md p-1 m-4 bg-slate-800 rounded-lg opacity-90">
						<svg className="fill-current text-yellow-500 w-4" viewBox="0 0 24 24"
						><g dataname="Layer 2"
						><path
							d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
							dataname="star"></path></g						></svg>
						<span className="ml-1">{Math.round((movie.rating || 0) * 10) / 10}</span>
						{/* <span className="mx-2">|</span> */}
						{/* <span>{movie.release_date}</span> */}
					</div>

					<div className="absolute top-0 right-0 z-10 flex items-center justify-center text-white text-md p-1 m-4 bg-slate-800 rounded-lg opacity-90">
						<span>{movie.release_date?.split('-')[0]}</span>
					</div>

					{["WATCHED", "DISCARD"].includes(movie.status) &&
						<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 flex items-center justify-center text-white text-md">
							<Stamp text={movie.status === 'WATCHED' ? 'YA LA HE VISTO!' : 'NO LA QUIERO VER'} color={movie.status === 'WATCHED' ? 'green' : 'red'} />
						</div>
					}

					{/* <!-- Botones flotantes en la parte inferior --> */}
					<div
						className="absolute inset-x-0 bottom-0 flex justify-center gap-8 md:gap-4 mb-4 px-4 py-4 pointer-events-none z-20"
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