import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmFromSearchModel } from 'types/FilmFromSearch';

export type FilmSearchState = {
	filmsFromSearch: FilmFromSearchModel[];
	filmsSearchHistory: FilmFromSearchModel[];
};

const initialState: FilmSearchState = {
	filmsFromSearch: [],
	filmsSearchHistory: [],
};

export const filmSearchSlice = createSlice({
	name: 'filmSearch',
	initialState,
	reducers: {
		SetFilmsFromSearch: (
			state,
			action: PayloadAction<FilmFromSearchModel[]>,
		) => {
			state.filmsFromSearch = action.payload;
		},
		DeleteFilmsFromSearch: (state) => {
			state.filmsFromSearch = [];
		},
		AddFilmToHistory: (state, action: PayloadAction<FilmFromSearchModel>) => {
			if (
				state.filmsSearchHistory.some((film) => film.id === action.payload.id)
			)
				return;

			state.filmsSearchHistory.unshift(action.payload);

			if (state.filmsSearchHistory.length > 10) {
				state.filmsSearchHistory.pop();
			}
		},
	},
});

export const { SetFilmsFromSearch, DeleteFilmsFromSearch, AddFilmToHistory } =
	filmSearchSlice.actions;
export const filmSearchReducer = filmSearchSlice.reducer;
