import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmFromListModel } from 'types/FilmFromList';
import { Meta } from 'utils/meta';

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
		DeleteFilms: (state) => {
			state.films = [];
		},
		SetMeta: (state, action: PayloadAction<Meta>) => {
			state.meta = action.payload;
		},
	},
});

export const { SetFilms, SetMeta, DeleteFilms } = filmListSlice.actions;
export const filmListReducer = filmListSlice.reducer;
