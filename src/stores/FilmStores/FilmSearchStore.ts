import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmFromSearchModel } from 'types/FilmFromSearch';
import { Meta } from 'utils/meta';

export type FilmSearchState = {
	filmsFromSearch: FilmFromSearchModel[];
	filmsSearchHistory: FilmFromSearchModel[];
	isSearchOpen: boolean;
	meta: Meta;
};

const initialState: FilmSearchState = {
	isSearchOpen: false,
	filmsFromSearch: [],
	filmsSearchHistory: [],
	meta: Meta.initial,
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
			) {
				return;
			}

			state.filmsSearchHistory.unshift(action.payload);

			if (state.filmsSearchHistory.length > 10) {
				state.filmsSearchHistory.pop();
			}
		},
		SetIsSearchOpen: (state, action: PayloadAction<boolean>) => {
			state.isSearchOpen = action.payload;
		},
		SetMeta: (state, action: PayloadAction<Meta>) => {
			state.meta = action.payload;
		},
	},
});

export const {
	SetFilmsFromSearch,
	DeleteFilmsFromSearch,
	AddFilmToHistory,
	SetIsSearchOpen,
	SetMeta,
} = filmSearchSlice.actions;
export const filmSearchReducer = filmSearchSlice.reducer;
