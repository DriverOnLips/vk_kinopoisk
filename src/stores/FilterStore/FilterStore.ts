import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgeType } from 'types/AgeType';
import { CountryType } from 'types/CountryType';
import { filmAgeSet, filmCountrySet } from './config';

export type FilterState = {
	filmAge: AgeType[];
	filmCountry: CountryType[];
};

const initialState: FilterState = {
	filmAge: filmAgeSet,
	filmCountry: filmCountrySet,
};

export const FilterStoreSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		SetFilmAge: (state, action: PayloadAction<number>) => {
			const updatedAges = state.filmAge.map((age: AgeType) => {
				return {
					...age,
					state: age.age === action.payload ? true : false,
				};
			});

			state.filmAge = updatedAges;
		},
		SetFilmCountry: (state, action: PayloadAction<string>) => {
			const updatedCountries = state.filmCountry.map((ctr: CountryType) => {
				return {
					...ctr,
					state: ctr.name === action.payload ? true : false,
				};
			});

			state.filmCountry = updatedCountries;
		},
	},
});

export const { SetFilmAge, SetFilmCountry } = FilterStoreSlice.actions;
export const filterReducer = FilterStoreSlice.reducer;
