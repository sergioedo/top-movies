import React, { useState, useEffect } from "react";
import { useStore } from '@nanostores/react';
import { $nextUserMovies } from '../stores/movies';

export const useUserMovies = ({ initialNextMovies = [] }) => {
	const storedNextUserMovies = useStore($nextUserMovies);
	// https://github.com/nanostores/persistent/issues/26
	const [nextUserMovies, setNextUserMovies] = useState(initialNextMovies);
	useEffect(() => {
		if (storedNextUserMovies) {
			setNextUserMovies(storedNextUserMovies)
		}
	}, [storedNextUserMovies])
	return {
		nextUserMovies
	}
}