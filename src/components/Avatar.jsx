import React, { useState, useEffect, useCallback } from "react";
import { signIn, signOut } from "auth-astro/client";
import { useUser } from '../hooks/useUser';

const handleSignIn = () => {
	signIn("google");
}

function Avatar() {
	const [user, setUser] = useUser();
	const [loading, setLoading] = useState(true);

	// Verificar sesión al cargar
	useEffect(() => {
		async function checkSession() {
			try {
				const response = await fetch("/api/auth/session", {
					method: "GET",
					credentials: "include",
				});
				if (response.ok) {
					const session = await response.json();
					setUser(session?.user);
				} else {
					setUser();
				}
			} catch (error) {
				console.error("Error al comprobar la sesión:", error);
			} finally {
				setLoading(false);
			}
		}
		checkSession();
	}, []);

	const handleSignout = useCallback(() => {
		setUser();
		signOut();
	}, [setUser, signOut])

	return (
		<div className="flex items-center gap-2">
			{(user && user?.name !== 'anonymous') ? (
				<div className="flex items-center gap-2 cursor-pointer">
					<img
						src={user.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
						alt={user.name || "Usuario"}
						className="w-10 h-10 rounded-full border-2 border-gray-300"
						onClick={handleSignout}
						title="Cerrar sesión"
						referrerPolicy="no-referrer"
					/>
					<span className="hidden md:block text-sm text-white">{user.name}</span>
				</div>
			) : (
				<button className="bg-blue-500 text-white border-none px-4 py-2 rounded-full cursor-pointer text-sm transition-colors hover:bg-blue-600" onClick={handleSignIn}>
					Iniciar Sesión
				</button>
			)}
		</div>
	);
}

export default Avatar;
