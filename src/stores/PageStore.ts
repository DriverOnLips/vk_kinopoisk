import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PageState = {
	page: number;
	pages: number;
};

const initialState: PageState = {
	page: 1,
	pages: 1,
};

export const PageStoreSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		SetPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		SetPages: (state, action: PayloadAction<number>) => {
			state.pages = action.payload;
		},
	},
});

export const { SetPage, SetPages } = PageStoreSlice.actions;
export const pageReducer = PageStoreSlice.reducer;
