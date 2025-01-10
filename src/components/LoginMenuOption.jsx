import React, { useState, useEffect, useCallback } from "react";
import { signIn, signOut } from "auth-astro/client";
import { useUser } from '../hooks/useUser';

const handleSignIn = () => {
	signIn("google");
}

function LoginMenuOption() {
	const [user, setUser] = useUser();

	const handleSignout = useCallback(() => {
		setUser();
		signOut();
	}, [setUser, signOut])

	return (
		<div className="flex items-center gap-2">
			{(user && user?.name !== 'anonymous') ? (
				<a
					href="#"
					onClick={handleSignout}
					referrerPolicy="no-referrer"
					className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-slate-700 underline-offset-2 hover:bg-red-700/5 hover:text-black focus-visible:underline focus:outline-none dark:text-slate-300 dark:hover:bg-red-600/5 dark:hover:text-white"
					role="menuitem"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="size-5 shrink-0"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
							clipRule="evenodd"></path>
						<path
							fillRule="evenodd"
							d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
							clipRule="evenodd"></path>
					</svg>
					<span>Cerrar sesión</span>
				</a>
			) : (
				<a
					href="#"
					onClick={handleSignIn}
					referrerPolicy="no-referrer"
					className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-slate-700 underline-offset-2 hover:bg-red-700/5 hover:text-black focus-visible:underline focus:outline-none dark:text-slate-300 dark:hover:bg-red-600/5 dark:hover:text-white"
					role="menuitem"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="size-5 shrink-0"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
							clipRule="evenodd"></path>
						<path
							fillRule="evenodd"
							d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
							clipRule="evenodd"></path>
					</svg>
					<span>Iniciar sesión</span>
				</a>
			)}
		</div>
	);
}

export default LoginMenuOption;
