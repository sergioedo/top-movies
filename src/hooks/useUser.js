import React, { useState, useEffect } from "react";
import { useStore } from '@nanostores/react';
import { $user, setStoredUser, setAnonymousStoredUser } from '../stores/user';
import useStoreState from "./useStoreState";

const setUser = (user) => {
	if (user) setStoredUser(user)
	else setAnonymousStoredUser()
}

export const useUser = () => {
	const user = useStoreState($user);
	return [
		user,
		setUser
	]
} 