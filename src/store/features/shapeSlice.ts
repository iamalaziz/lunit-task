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
	},
});

export const { addPolygonToList } = shapeSlice.actions;
export default shapeSlice.reducer;
