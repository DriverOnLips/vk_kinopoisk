import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmModel } from 'types/Film';
import { Meta } from 'utils/meta';

export type FilmPageState = {
	film: FilmModel | null;
	meta: Meta;
};

const initialState: FilmPageState = {
	film: null,
	meta: Meta.initial,
};

export const filmPageSlice = createSlice({
	name: 'filmPage',
	initialState,
	reducers: {
		SetFilm: (state, action: PayloadAction<FilmModel>) => {
			state.film = action.payload;
		},
		DeleteFilm: (state) => {
			state.film = null;
		},
		SetMeta: (state, action: PayloadAction<Meta>) => {
			state.meta = action.payload;
		},
	},
});

export const { SetFilm, DeleteFilm, SetMeta } = filmPageSlice.actions;
export const filmPageReducer = filmPageSlice.reducer;
