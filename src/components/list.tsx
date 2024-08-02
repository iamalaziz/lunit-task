'use client'

import { useAppSelector } from '@/store/hooks';
import React from 'react';

export default function List() {
	const polygons = useAppSelector((state) => state.shapes)

	return (
		<div className="min-w-[300px] rounded-xl border border-slate-300">
			<h2 className='p-2 px-4 font-semibold text-blue-600 dark:text-slate-300 border-b'>List</h2>
			<ul className=''>
				{polygons.map((polygon, index) => (
					<li key={polygon.id} className='py-2 px-4 font-light'>Polygon {index+1}</li>
				))}
			</ul>
		</div>
	);
}
