import { persistentAtom } from '@nanostores/persistent'

const storageEncoding = {
	encode: JSON.stringify,
	decode: JSON.parse,
}
export const anonymousUser = {
	email: 'anonymous@gmail.com',
	image: 'https://avatar.iran.liara.run/public/13',
	name: 'anonymous'
}

export const $user = persistentAtom('nano-user', anonymousUser, storageEncoding)

export const setStoredUser = (user) => $user.set(user)
export const setAnonymousStoredUser = () => $user.set(anonymousUser)
export const isAnonymousUser = (user) => user && user?.email === anonymousUser.email