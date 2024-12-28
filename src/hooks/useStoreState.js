import { useState, useEffect } from "react";
import { useStore } from '@nanostores/react';

// https://github.com/nanostores/persistent/issues/26
const useStoreState = ($store, initialState) => {
	const storedState = useStore($store);
	const [state, setState] = useState(initialState);
	useEffect(() => {
		if (storedState) {
			setState(storedState)
		}
	}, [storedState])

	return state
}

export default useStoreState