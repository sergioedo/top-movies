import React, { useState, useEffect } from "react";
import { useStore } from '@nanostores/react';
import { $user, setStoredUser, setAnonymousStoredUser } from '../stores/user';

const setUser = (user) => {
	if (user) setStoredUser(user)
	else setAnonymousStoredUser()
}

export const useUser = () => {
	const storedUser = useStore($user);
	// https://github.com/nanostores/persistent/issues/26
	const [user, setUserState] = useState();
	useEffect(() => {
		if (storedUser) {
			setUserState(storedUser)
		}
	}, [storedUser])

	return [
		user,
		setUser
	]
} 