import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountryType } from 'types/CountryType';
import { filmCountrySet } from './config';

export type FilterState = {
	filmAge: number;
	filmCountry: CountryType[];
};

const initialState: FilterState = {
	filmAge: 0,
	filmCountry: filmCountrySet,
};

export const FilterStoreSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		SetFilmAge: (state, action: PayloadAction<number>) => {
			state.filmAge = action.payload;
		},
		SetFilmCountry: (state, action: PayloadAction<CountryType[]>) => {
			state.filmCountry = action.payload;
		},
	},
});

export const { SetFilmAge, SetFilmCountry } = FilterStoreSlice.actions;
export const filterReducer = FilterStoreSlice.reducer;
