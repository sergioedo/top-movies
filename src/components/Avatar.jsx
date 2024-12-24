import React, { useState, useEffect } from "react";
import { signIn, signOut } from "auth-astro/client";

function Avatar() {
	const [user, setUser] = useState(null);
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
					console.log({ session })
					setUser(session?.user || null);
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error("Error al comprobar la sesión:", error);
			} finally {
				setLoading(false);
			}
		}
		checkSession();
	}, []);

	return (
		<div style={styles.container}>
			{user ? (
				// Mostrar avatar si hay sesión
				<div style={styles.avatarContainer}>
					<img
						src={user.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
						alt={user.name || "Usuario"}
						style={styles.avatar}
						onClick={() => signOut()} // Usar signOut de auth-astro
						title="Cerrar sesión"
						referrerpolicy="no-referrer"
					/>
					<span style={styles.name}>{user.name}</span>
				</div>
			) : (
				// Mostrar botón de login si no hay sesión
				<button style={styles.loginButton} onClick={() => signIn("google")}>
					Iniciar Sesión
				</button>
			)}
		</div>
	);
}

// Estilos inline
const styles = {
	container: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
	},
	avatarContainer: {
		display: "flex",
		alignItems: "center",
		gap: "8px",
		cursor: "pointer",
	},
	avatar: {
		width: "40px",
		height: "40px",
		borderRadius: "50%",
		border: "2px solid #ddd",
	},
	name: {
		fontSize: "14px",
		color: "#ffffff",
	},
	loginButton: {
		backgroundColor: "#4285F4",
		color: "white",
		border: "none",
		padding: "8px 16px",
		borderRadius: "20px",
		cursor: "pointer",
		fontSize: "14px",
		transition: "background-color 0.3s",
	},
	loading: {
		fontSize: "14px",
		color: "#999",
	},
};

// Cambiar color al hover del botón
styles.loginButton[":hover"] = {
	backgroundColor: "#357ae8",
};

export default Avatar;
