import { createSlice } from '@reduxjs/toolkit';

import { ICircle } from '@/types';

const initialState: ICircle[] = [];

export const shapeSlice = createSlice({
	name: 'shapes',
	initialState,
	reducers: {
		addPolygonToList: (state, { payload }) => {
			return [...state, payload];
		},
		removePolygonFromList: (state, { payload }) => {
			if (state) {
				return state.filter((shape) => shape.id !== payload);
			}
		},
	},
});

export const { addPolygonToList, removePolygonFromList } = shapeSlice.actions;
export default shapeSlice.reducer;
