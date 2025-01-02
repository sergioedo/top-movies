import { useState, useEffect } from 'react'
import { useUserMovies } from '../hooks/useUserMovies'
import { MovieCard } from './MovieCard'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { useMediaQuery } from 'usehooks-ts'

// https://medium.com/@reesemb1/movie-card-carousels-in-react-3b9e798f9cb2
// Issue: https://github.com/express-labs/pure-react-carousel/issues/476
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';

//Others carrousels:
// https://levelup.gitconnected.com/how-to-implement-netflix-slider-with-react-and-hooks-bdb9b99d1ce4
// https://www.npmjs.com/package/react-awesome-slider

const isVisible = (movie) => true //["UNKNOWN"].includes(movie.status)

const NextMovies = ({ initialNextMovies = [] }) => {
	const { nextUserMovies } = useUserMovies({ initialNextMovies })
	const [isDesktop, setIsDesktop] = useState(false)
	const matches = useMediaQuery('(min-width: 768px)')
	useEffect(() => {
		setIsDesktop(matches)
	}, [matches])
	console.log({ isDesktop })
	// const customRenderItem = (item, props) => {
	// 	console.log({ props })
	// 	return (
	// 		<item.type {...item.props} fullDetail={true} />
	// 	)
	// }
	return (
		<div className="mt-4 mb-8 bg-slate-800 rounded-lg">
			<Carousel
				showArrows={true}
				centerMode={isDesktop}
				centerSlidePercentage={20}
				// dynamicHeight={true}
				// renderItem2={customRenderItem}
				showThumbs={false}
			// renderThumbs={() => (nextUserMovies && nextUserMovies.map(movie => <span key={movie.id}>AAAA</span>)) || []}
			>
				{nextUserMovies && nextUserMovies.map(movie => <MovieCard key={movie.id} client:visible initialMovie={{ ...movie, status: "UNKNOWN", visible: true }} isVisible={isVisible} />)}
			</Carousel >
		</div >
		// <CarouselProvider
		// 	naturalSlideWidth={100}
		// 	naturalSlideHeight={125}
		// 	totalSlides={3}
		// >
		// 	<Slider>
		// 		{/* {nextUserMovies && nextUserMovies.map((movie, idx) => <Slide key={movie.id} index={idx}><MovieCard client:visible initialMovie={{ ...movie, status: "UNKNOWN", visible: true }} isVisible={isVisible} fullDetail={isDesktop} /></Slide>)} */}
		// 		<Slide index={0}>I am the first Slide.</Slide>
		// 		<Slide index={1}>I am the second Slide.</Slide>
		// 		<Slide index={2}>I am the third Slide.</Slide>
		// 	</Slider>
		// </CarouselProvider >
	)
}

export default NextMovies
