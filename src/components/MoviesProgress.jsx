import { useUserMovies } from "hooks/useUserMovies"
import { useEffect, useState } from "react"

const MoviesProgress = ({ initialStats, totalMovies }) => {
	const { userMovies, getAllMoviesStats } = useUserMovies()
	const [allMoviesStats, setAllMoviesStats] = useState(initialStats)
	useEffect(() => {
		if (userMovies) setAllMoviesStats(getAllMoviesStats(totalMovies))
	}, [userMovies])

	return (
		<div className="relative mx-0">
			<div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-white">
				<div
					style={{ width: `${allMoviesStats.discardPercentage}%` }}
					className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"
				>
					<span>{allMoviesStats.discardMoviesCount}</span>
				</div>
				<div style={{ width: `${allMoviesStats.seenPercentage}%` }}
					className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-400"
				>
					<span>{allMoviesStats.seenMoviesCount}</span>
				</div >
				<div style={{ width: `${allMoviesStats.unseenPercentage}%` }}
					className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
				>
					<span>{allMoviesStats.unseenMoviesCount}</span>
				</div>
			</div >
		</div >
	)
}

export default MoviesProgress