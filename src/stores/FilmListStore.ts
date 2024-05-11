import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meta } from '@utils/meta';
import { FilmFromListModel } from 'types/FilmFromList';

export type FilmListState = {
	films: FilmFromListModel[];
	meta: Meta;
};

const initialState: FilmListState = {
	films: [],
	meta: Meta.initial,
};

export const filmListSlice = createSlice({
	name: 'filmList',
	initialState,
	reducers: {
		SetFilms: (state, action: PayloadAction<FilmFromListModel[]>) => {
			state.films = action.payload;
		},
		SetMeta: (state, action: PayloadAction<Meta>) => {
			state.meta = action.payload;
		},
	},
});

export const { SetFilms, SetMeta } = filmListSlice.actions;
export const filmListReducer = filmListSlice.reducer;
