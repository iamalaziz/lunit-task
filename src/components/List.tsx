'use client';

import React from 'react';

import { useAppSelector } from '@/store/hooks';

export default function List() {
	const polygons = useAppSelector((state) => state.shapes);

	return (
		<div className="min-w-[200px] rounded-xl border border-slate-300">
			<h2 className="border-b border-slate-300 p-2 px-4 font-semibold text-blue-600">List</h2>
			<ul className="max-h-[80vh] overflow-hidden overflow-y-auto">
				{polygons.length == 0 && <p className="text-primary my-2 text-center ">Empty</p>}
				{polygons?.map((polygon, index) => (
					<li
						key={polygon.id}
						className="cursor-pointer px-4 py-2 font-light hover:bg-blue-200 hover:text-gray-900"
					>
						Polygon {index + 1}
					</li>
				))}
			</ul>
		</div>
	);
}
