'use client';

import { ComponentProps } from 'react';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { useAppDispatch } from '../store/hooks';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { switchTheme } from '@/store/features/settingsSlice';

type ThemeSwitcherProps = {
	className?: ComponentProps<'button'>['className'];
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
	const { theme, setTheme } = useTheme();

	/// redux store
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(switchTheme(theme));
	}, [theme, dispatch]);

	return (
		<Button
			className={className}
			variant="secondary"
			size="icon"
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<Icons.sun className="dark:hidden" />
			<Icons.moon className="hidden dark:block" />
		</Button>
	);
};
