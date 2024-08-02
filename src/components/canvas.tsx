'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ICircle } from '@/types';
import { useAppDispatch } from '../store/hooks';
import { addPolygonToList } from '@/store/features/shapeSlice';
import generateUniqueId from '@/lib/uniqueId';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [polygonPoints, setPolygonPoints] = useState<ICircle | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  /// redux store
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
        context.strokeStyle = '#000';
        context.lineWidth = 2;
        setCtx(context);
      }
    }
  }, []);

  const startDrawing = () => {
    setPolygonPoints({ id: generateUniqueId(), points: [] });
  };

  const draw = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
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
  };

  const stopDrawing = () => {
    if (polygonPoints && ctx) {
      const { points } = polygonPoints;
      if (points.length > 1) {
        const { x, y } = points[0];
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      dispatch(addPolygonToList(polygonPoints));
      setPolygonPoints(null);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="flex-1 w-full h-full border border-slate-300 rounded-xl"
    >
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
