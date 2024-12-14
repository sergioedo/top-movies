import fetch from 'node-fetch';
import jose from 'node-jose';

const googleClientID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;

export async function verifyGoogleTokenAuto(idToken) {
	const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
	const tokenInfo = await response.json();
	if (tokenInfo.aud === googleClientID) {
		return tokenInfo;
	} else {
		throw new Error('Token inválido');
	}
}

export async function verifyGoogleTokenManual(idToken) {
	// Paso 1: Obtener las claves públicas de Google
	const response = await fetch('https://www.googleapis.com/oauth2/v3/certs');
	const { keys } = await response.json();

	// Paso 2: Decodificar el encabezado del token para obtener el 'kid'
	const [header] = idToken.split('.');
	const decodedHeader = JSON.parse(Buffer.from(header, 'base64').toString('utf8'));
	const kid = decodedHeader.kid;

	// Paso 3: Encontrar la clave pública correspondiente al 'kid'
	const key = keys.find(key => key.kid === kid);
	if (!key) throw new Error('No se encontró la clave pública para el token.');

	// Paso 4: Verificar el token usando la clave pública
	const keystore = jose.JWK.createKeyStore();
	const publicKey = await keystore.add(key);
	const verifiedToken = await jose.JWS.createVerify(publicKey).verify(idToken);

	// Paso 5: Parsear el payload del token y verificar audiencia
	const payload = JSON.parse(verifiedToken.payload.toString());
	if (payload.aud !== googleClientID) {
		throw new Error('Audiencia no válida.');
	}

	return payload; // Contiene la información del usuario verificada
}