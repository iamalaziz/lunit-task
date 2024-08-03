import DeleteMode from '../delete-mode';

import { ThemeSwitcher } from '@/components/theme-switcher';

export const Navbar = async () => {
	return (
		<header className="w-full border-b">
			<div className="container flex h-16 items-center justify-between">
				<a href="/" className="font-mono text-lg font-bold">
					{'>'} _draw
				</a>
				<div className="flex gap-2">
					<DeleteMode />
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	);
};
