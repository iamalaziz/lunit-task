'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import generateUniqueId from '@/lib/utils';
import { addPolygonToList, removePolygonFromList } from '@/store/features/shapeSlice';
import { ICircle, IPoint } from '@/types';

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [polygonPoints, setPolygonPoints] = useState<ICircle | null>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [drawing, setDrawing] = useState<boolean>(false);

	/// redux store
	const shapes = useAppSelector((state) => state.shapes);
	const { deleteMode, theme } = useAppSelector((state) => state.settings);
	const dispatch = useAppDispatch();

	/// onMount
	useEffect(() => {
		const canvas = canvasRef.current;
		const wrapper = wrapperRef.current;
		if (canvas && wrapper) {
			/// matches width and height of canvas and wrapper
			/// so that mouse cursor and line match
			canvas.width = wrapper.offsetWidth;
			canvas.height = wrapper.offsetHeight;

			const context = canvas.getContext('2d');

			if (context) {
				if (theme === 'dark') context.strokeStyle = '#fff';
				else context.strokeStyle = '#000';
				context.lineWidth = 2;
				setCtx(context);
			}
		}
		redraw();
	}, [theme]);

	const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!deleteMode) {
			setDrawing(true);
			setPolygonPoints({ id: generateUniqueId(), points: [] });
		} else {
			const { offsetX, offsetY } = nativeEvent;
			removePolygon({ x: offsetX, y: offsetY });
		}
	};

	const draw = useCallback(
		({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
			const { offsetX, offsetY } = nativeEvent;

			if (ctx) {
				if (!polygonPoints) {
					ctx.moveTo(offsetX, offsetY);
					return;
				}

				ctx.lineTo(offsetX, offsetY);
				ctx.stroke();

				const { id, points } = polygonPoints;
				const newPoints = [...points, { x: offsetX, y: offsetY }];
				setPolygonPoints({ id, points: newPoints });
			}
		},
		[drawing, polygonPoints]
	);

	const stopDrawing = () => {
		if (drawing && polygonPoints && ctx) {
			const { points } = polygonPoints;
			if (points.length < 2) {
				setPolygonPoints(null);
				return;
			}
			if (points.length > 1) {
				const { x, y } = points[0];
				ctx.lineTo(x, y);
				ctx.stroke();
			}

			dispatch(addPolygonToList(polygonPoints));
			setDrawing(false);
			setPolygonPoints(null);
		}
	};

	const clearCanvas = () => {
		if (!ctx || !wrapperRef.current) return;
		const wrapper = wrapperRef.current;
		ctx.beginPath();
		ctx.clearRect(0, 0, wrapper.offsetWidth, wrapper.offsetHeight);
	};

	const removePolygon = ({ x, y }: IPoint) => {
		for (let i = shapes.length - 1; i >= 0; i--) {
			const { id, points } = shapes[i];
			if (ctx) {
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				points.forEach((point) => ctx.lineTo(point.x, point.y));
				ctx.closePath();

				if (ctx.isPointInPath(x, y)) {
					dispatch(removePolygonFromList(id));
					break;
				}
			}
		}
	};

	/// when circle is deleted, clear canvas and redraws remaining shapes
	const redraw = useCallback(() => {
		clearCanvas();
		if (ctx) {
			shapes.forEach((shape) => {
				const { points } = shape;
				if (points.length > 0) {
					ctx.beginPath();
					ctx.moveTo(points[0].x, points[0].y);
					points.forEach((point) => ctx.lineTo(point.x, point.y));
					ctx.closePath();
					ctx.stroke();
				}
			});
		}
	}, [shapes]);

	useEffect(() => {
		redraw();
	}, [shapes]);

	return (
		<div ref={wrapperRef} className="size-full flex-1 rounded-xl border border-slate-300">
			<canvas
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseLeave={stopDrawing}
				id="drawing-area"
			></canvas>
		</div>
	);
};

export default Canvas;
