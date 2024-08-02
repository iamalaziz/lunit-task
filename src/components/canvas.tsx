'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CircleT {
  id: number;
  points: Point[];
}

interface Point {
  x: number;
  y: number;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [circlePoints, setCirclePoints] = useState<CircleT | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

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
    setCirclePoints({ id: 1, points: [] });
  };

  const draw = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { offsetX, offsetY } = nativeEvent;

    if (ctx) {
      if (!circlePoints) {
        ctx.moveTo(offsetX, offsetY);
        return;
      }

      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();

      const { id, points } = circlePoints;
      const newPoints = [...points, { x: offsetX, y: offsetY }];
      setCirclePoints({ id, points: newPoints });
    }
  };

  const stopDrawing = () => {
    if (circlePoints && ctx) {
      const { points } = circlePoints;
      if (points.length > 1) {
        const { x, y } = points[0];
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      setCirclePoints(null);
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
