import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useDrawing } from './useDrawing';

export const useCanvas = (
	canvasRef: React.RefObject<HTMLCanvasElement>,
	wrapperRef: React.RefObject<HTMLDivElement>,
	theme: 'dark' | 'light'
): CanvasRenderingContext2D | null => {
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

	/// store
	const shapes = useAppSelector((state) => state.shapes);
	const dispatch = useAppDispatch();
	const { redraw } = useDrawing(ctx, shapes, dispatch);

	useEffect(() => {
		const canvas = canvasRef.current;
		const wrapper = wrapperRef.current;
		if (canvas && wrapper) {
			canvas.width = wrapper.offsetWidth;
			canvas.height = wrapper.offsetHeight;
			const context = canvas.getContext('2d');
			if (context) {
				context.strokeStyle = theme === 'dark' ? '#fff' : '#000';
				context.lineWidth = 2;
				setCtx(context);
			}
		}
		redraw();
	}, [canvasRef, wrapperRef, theme]);

	return ctx;
};
