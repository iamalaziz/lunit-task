'use client';

import React, { ComponentProps } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Icons } from './icons';

import { Button } from '@/components/ui/button';
import { switchDeleteMode } from '@/store/features/settingsSlice';

type DeleteModeProps = {
	className?: ComponentProps<'button'>['className'];
};

const DeleteMode = ({ className }: DeleteModeProps) => {
	// store
	const { deleteMode } = useAppSelector((state) => state.settings);
	const dispatch = useAppDispatch();

	return (
		<Button
			className={`${className} ${deleteMode ? 'bg-red-500 text-white hover:bg-red-400' : ''}`}
			variant="secondary"
			size="icon"
			onClick={() => dispatch(switchDeleteMode())}
		>
			<Icons.trash />
		</Button>
	);
};

export default DeleteMode;
