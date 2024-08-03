import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	deleteMode: false,
	theme: 'light',
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		switchDeleteMode: (state) => {
			if (state.deleteMode) state.deleteMode = false;
			else state.deleteMode = true;
		},
		switchTheme: (state, { payload }) => {
			state.theme = payload;
		},
	},
});

export const { switchDeleteMode, switchTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
