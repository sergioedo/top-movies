export const WatchedButton = ({ size }) => {
	return (
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

export const DiscardButton = ({ size }) => {
	return (
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

export const UndoButton = ({ size }) => {
	return (
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