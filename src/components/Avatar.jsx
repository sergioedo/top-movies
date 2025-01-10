import { useUser } from '../hooks/useUser';

function Avatar() {
	const [user, setUser] = useUser();
	const userImage = user && user?.name !== 'anonymous' && user.image ? user.image : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
	const userName = user && user?.name !== 'anonymous' ? user?.name : '';
	const userEmail = user && user?.name !== 'anonymous' ? user?.email : '';
	return (
		<div className={`flex items-center ${userName ? 'gap-2' : 'gap-0'}`}>
			<img src={userImage} className="size-8 object-cover rounded-xl" alt="avatar" aria-hidden="true" />
			<div className="hidden md:flex flex-col">
				<span className="text-sm font-bold text-black dark:text-white">{userName}</span>
				<span className="text-xs" aria-hidden="true">{userEmail}</span>
				<span className="sr-only">profile settings</span>
			</div>

		</div>
	);
}

export default Avatar;
