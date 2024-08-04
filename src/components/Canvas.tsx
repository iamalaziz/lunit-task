'use client';

import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useCanvas } from '@/hooks/useCanvas';
import { useDrawing } from '@/hooks/useDrawing';
import { IPoint } from '@/types';
import { useTouchHandlers } from '@/hooks/useTouchHandlers';

const Canvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const shapes = useAppSelector((state) => state.shapes);
	const { deleteMode, theme } = useAppSelector((state) => state.settings);
	const dispatch = useAppDispatch();

	const ctx = useCanvas(canvasRef, wrapperRef, theme);
	const { startDrawing, draw, stopDrawing, removePolygon } = useDrawing(ctx, shapes, dispatch);

	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandlers(
		canvasRef,
		deleteMode,
		startDrawing,
		draw,
		stopDrawing,
		removePolygon
	);

	const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (deleteMode) {
			const { offsetX, offsetY } = event.nativeEvent;
			removePolygon({ x: offsetX, y: offsetY } as IPoint);
		} else {
			startDrawing();
		}
	};

	return (
		<div ref={wrapperRef} className="size-full flex-1 rounded-xl border border-slate-300">
			<canvas
				ref={canvasRef}
				onMouseDown={handleMouseDown}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseLeave={stopDrawing}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onTouchCancel={handleTouchEnd}
				id="drawing-area"
			></canvas>
		</div>
	);
};

export default Canvas;
