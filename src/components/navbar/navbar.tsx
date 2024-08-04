'use client';
import { useAppDispatch } from '../../store/hooks';
import { Button } from '../ui/button';

import DeleteMode from '@/components/DeleteMode';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { emptyList } from '@/store/features/shapeSlice';

export const Navbar = () => {
	const dispatch = useAppDispatch();
	return (
		<header className="w-full border-b">
			<div className="container flex h-16 items-center justify-between">
				<a href="/" className="font-mono text-lg font-bold">
					{'>'} _draw
				</a>
				<div className="flex gap-2">
					<Button variant="destructive" onClick={() => dispatch(emptyList())}>
						Clear All
					</Button>
					<DeleteMode />
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	);
};
