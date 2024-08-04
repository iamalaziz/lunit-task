import React from 'react';

import { IPoint } from '@/types';

export const useTouchHandlers = (
	canvasRef: React.RefObject<HTMLCanvasElement>,
	deleteMode: boolean,
	startDrawing: () => void,
	draw: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void,
	stopDrawing: () => void,
	removePolygon: (point: IPoint) => void
) => {
	const getTouchPos = (canvas: HTMLCanvasElement, touchEvent: React.TouchEvent<HTMLCanvasElement>) => {
		const rect = canvas.getBoundingClientRect();
		const touch = touchEvent.touches[0];
		return {
			x: touch.clientX - rect.left,
			y: touch.clientY - rect.top,
		};
	};

	const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
		event.preventDefault();
		const canvas = canvasRef.current;
		if (canvas) {
			const touchPos = getTouchPos(canvas, event);
			if (deleteMode) {
				removePolygon(touchPos as IPoint);
			} else {
				startDrawing();
			}
		}
	};

	const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
		event.preventDefault();
		const canvas = canvasRef.current;
		if (canvas) {
			const touchPos = getTouchPos(canvas, event);
			draw({ nativeEvent: { offsetX: touchPos.x, offsetY: touchPos.y } } as React.MouseEvent<
				HTMLCanvasElement,
				MouseEvent
			>);
		}
	};

	const handleTouchEnd = (event: React.TouchEvent<HTMLCanvasElement>) => {
		event.preventDefault();
		stopDrawing();
	};

	return {
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
	};
};
