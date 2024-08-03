'use client';

import React from 'react';

import { useAppSelector } from '@/store/hooks';

export default function List() {
	const polygons = useAppSelector((state) => state.shapes);

	return (
		<div className="min-w-[200px] rounded-xl border border-slate-300">
			<h2 className="border-b p-2 px-4 font-semibold text-blue-600 dark:text-slate-300">List</h2>
			<ul className="">
				{polygons.map((polygon, index) => (
					<li
						key={polygon.id}
						className="cursor-pointer px-4 py-2 font-light hover:bg-blue-200"
					>
						Polygon {index + 1}
					</li>
				))}
			</ul>
		</div>
	);
}
