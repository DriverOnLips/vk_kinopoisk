import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmModel } from 'types/Film';
import { FilmFromListModel } from 'types/FilmFromList';
import { FilmFromSearchModel } from 'types/FilmFromSearch';

export type FilmState = {
	films: FilmFromListModel[];
	film: FilmModel | null;
	filmsFromSearch: FilmFromSearchModel[];
	filmsSearchHistory: FilmFromSearchModel[];
};

const initialState: FilmState = {
	films: [],
	film: null,
	filmsFromSearch: [],
	filmsSearchHistory: [],
};

export const filmSlice = createSlice({
	name: 'film',
	initialState,
	reducers: {
		SetFilms: (state, action: PayloadAction<FilmFromListModel[]>) => {
			state.films = action.payload;
		},
		SetFilm: (state, action: PayloadAction<FilmModel>) => {
			state.film = action.payload;
		},
		DeleteFilm: (state) => {
			state.film = null;
		},
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

export const {
	SetFilms,
	SetFilm,
	DeleteFilm,
	SetFilmsFromSearch,
	DeleteFilmsFromSearch,
	AddFilmToHistory,
} = filmSlice.actions;
export const filmReducer = filmSlice.reducer;
