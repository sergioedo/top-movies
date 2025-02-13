import { useUserMovies } from "hooks/useUserMovies"
import { useEffect, useState } from "react"

const CircleProgress = ({ stats, title, subtitle, url }) => {
	return (
		<div
			className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
		>
			<svg
				className="w-32 h-32 md:w-24 md:h-24 fill-slate-700"
				viewBox="0 0 36 36"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* <!-- Fondo gris --> */}
				<circle
					cx="18"
					cy="18"
					r="16"
					stroke="#e5e7eb"
					strokeWidth="4"
					onMouseOver={(event) => event.target.setAttribute('fill', 'blue')}></circle>
				{/* <!-- Películas vistas --> */}
				<circle
					cx="18"
					cy="18"
					r="15.915"
					fill="none"
					stroke="#34d399"
					strokeWidth="3"
					strokeDasharray={`${stats.seenPercentage} ${100 - stats.seenPercentage}`}
					strokeDashoffset="0"
					strokeLinecap="round"
					transform="rotate(-90 18 18)"></circle>
				{/* <!-- Películas descartadas --> */}
				<circle
					cx="18"
					cy="18"
					r="15.915"
					fill="none"
					stroke="#f87171"
					strokeWidth="3"
					strokeDasharray={`${stats.discardPercentage} ${100 - stats.discardPercentage}`}
					strokeDashoffset={`${-stats.seenPercentage}`}
					strokeLinecap="round"
					transform="rotate(-90 18 18)"></circle>
				{/* <!-- Películas no vistas --> */}
				<circle
					cx="18"
					cy="18"
					r="15.915"
					fill="none"
					stroke="#9ca3af"
					display={`${stats.unseenPercentage > 0 ? 'block' : 'none'}`}
					strokeWidth="3"
					strokeDasharray={`${stats.unseenPercentage} ${100 - stats.unseenPercentage}`}
					strokeDashoffset={`${-stats.seenPercentage - stats.discardPercentage}`}
					strokeLinecap="round"
					transform="rotate(-90 18 18)"></circle>
			</svg>
			{/* <!-- Texto del año y contador --> */}
			<a
				href={url}
				className="absolute inset-0 flex flex-col items-center justify-center text-white text-2xl md:text-xl font-bold hover:text-red-600"
			>
				<span>{title}</span>
				<span className="text-sm md:text:xs">
					{subtitle}
				</span>
			</a>
		</div>
	)
}

export const YearCircleProgress = ({ initialStats, year, yearMovies, genre }) => {
	const { userMovies, getUserMoviesStats } = useUserMovies()
	const [yearStats, setYearStats] = useState(initialStats)
	useEffect(() => {
		if (userMovies) setYearStats(getUserMoviesStats(yearMovies))
	}, [userMovies])
	const subtitle = `${yearStats.seenMoviesCount + yearStats.discardMoviesCount}/${yearMovies.length}`
	return <CircleProgress stats={yearStats} title={year} subtitle={subtitle} url={`${genre ? `/${genre}` : ''}/year/${year}`} />
}