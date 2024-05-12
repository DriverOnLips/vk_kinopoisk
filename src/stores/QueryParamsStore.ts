import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import qs, { parse } from 'qs';

export type QueryParamsState = {
	params: qs.ParsedQs;
	string: string;
};

const initialState: QueryParamsState = {
	params: {},
	string: '',
};

const QueryParamsSlice = createSlice({
	name: 'queryParams',
	initialState,
	reducers: {
		SetString: (state, action: PayloadAction<string>) => {
			let search = action.payload;
			search = search.startsWith('?') ? search.slice(1) : search;

			if (state.string !== search) {
				state.string = search;
				state.params = parse(search);
			}
		},
	},
});

export const { SetString } = QueryParamsSlice.actions;
export const queryParamsReducer = QueryParamsSlice.reducer;
