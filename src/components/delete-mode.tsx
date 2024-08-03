'use client';

import React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Icons } from './icons';

import { Button } from '@/components/ui/button';
import { switchDeleteMode } from '@/store/features/settingsSlice';

const DeleteMode = () => {
	// store
	const { deleteMode } = useAppSelector((state) => state.settings);
	const dispatch = useAppDispatch();

	return (
		<Button
			variant={deleteMode ? 'destructive' : 'secondary'}
			size="icon"
			onClick={() => dispatch(switchDeleteMode())}
		>
			<Icons.trash />
		</Button>
	);
};

export default DeleteMode;
