import { useState, useEffect } from 'react'
import { useUserMovies } from '../hooks/useUserMovies'
import { MovieCard } from './MovieCard'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { useMediaQuery } from 'usehooks-ts'

const NextMovies = ({ initialNextMovies = [] }) => {
	const { nextUserMovies } = useUserMovies({ initialNextMovies })
	const [isDesktop, setIsDesktop] = useState(false)
	const matches = useMediaQuery('(min-width: 768px)')
	useEffect(() => {
		setIsDesktop(matches)
	}, [matches])
	console.log({ isDesktop })
	return (
		<div className="mt-4 mb-8 bg-slate-800 rounded-lg">
			<Carousel
				showArrows={true}
				centerMode={isDesktop}
				centerSlidePercentage={20}
				showThumbs={false}
			>
				{nextUserMovies && nextUserMovies.map(movie => <MovieCard key={movie.id} client:visible initialMovie={{ ...movie, status: "UNKNOWN", visible: true }} />)}
			</Carousel >
		</div>
	)
}

export default NextMovies
