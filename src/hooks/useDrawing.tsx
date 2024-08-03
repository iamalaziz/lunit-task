import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addPolygonToList, removePolygonFromList } from '@/store/features/shapeSlice';
import { ICircle, IPoint } from '@/types';
import generateUniqueId from '@/lib/utils';

export const useDrawing = (
  ctx: CanvasRenderingContext2D | null,
  shapes: ICircle[],
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  const [polygonPoints, setPolygonPoints] = useState<ICircle | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setDrawing(true);
    setPolygonPoints({ id: generateUniqueId(), points: [] });
  };

  const draw = useCallback(
    ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!ctx) return;
      const { offsetX, offsetY } = nativeEvent;
      if (!polygonPoints) {
        ctx.moveTo(offsetX, offsetY);
        return;
      }
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      const newPoints = [...polygonPoints.points, { x: offsetX, y: offsetY }];
      setPolygonPoints({ id: polygonPoints.id, points: newPoints });
    },
    [ctx, polygonPoints]
  );

  const stopDrawing = () => {
    if (!drawing || !polygonPoints || !ctx) return;
    if (polygonPoints.points.length < 2) {
      setPolygonPoints(null);
      return;
    }
    ctx.lineTo(polygonPoints.points[0].x, polygonPoints.points[0].y);
    ctx.stroke();
    dispatch(addPolygonToList(polygonPoints));
    setDrawing(false);
    setPolygonPoints(null);
  };

  const clearCanvas = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const redraw = useCallback(() => {
    clearCanvas();
    shapes.forEach(({ points }) => {
      if (ctx && points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.stroke();
      }
    });
  }, [shapes, ctx]);

  useEffect(() => {
    redraw();
  }, [shapes, redraw]);

  const removePolygon = ({ x, y }: IPoint) => {
    for (let i = shapes.length - 1; i >= 0; i--) {
      const { id, points } = shapes[i];
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();
      if (ctx.isPointInPath(x, y)) {
        dispatch(removePolygonFromList(id));
        break;
      }
    }
  };

  return {
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    redraw,
    removePolygon
  };
};
