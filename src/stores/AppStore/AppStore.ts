import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountryType } from 'types/CountryType';
import { filmCountrySet } from './config';

export type AppState = {
	filmAge: number;
	filmCountry: CountryType[];
	page: number;
	pages: number;
	isSearchOpen: boolean;
};

const initialState: AppState = {
	filmAge: 0,
	filmCountry: filmCountrySet,
	page: 1,
	pages: 1,
	isSearchOpen: false,
};

export const AppSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		SetFilmAge: (state, action: PayloadAction<number>) => {
			state.filmAge = action.payload;
		},
		SetFilmCountry: (state, action: PayloadAction<CountryType[]>) => {
			state.filmCountry = action.payload;
		},
		SetPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		SetPages: (state, action: PayloadAction<number>) => {
			state.pages = action.payload;
		},
		SetIsSearchOpen: (state, action: PayloadAction<boolean>) => {
			state.isSearchOpen = action.payload;
		},
	},
});

export const {
	SetFilmAge,
	SetFilmCountry,
	SetPage,
	SetPages,
	SetIsSearchOpen,
} = AppSlice.actions;
export const appReducer = AppSlice.reducer;
