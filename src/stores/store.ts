import { configureStore } from '@reduxjs/toolkit';
import { filmListReducer } from './FilmStores/FilmListStore';
import { filmPageReducer } from './FilmStores/FilmPageStore';
import { filmSearchReducer } from './FilmStores/FilmSearchStore';
import { filterReducer } from './FilterStore/FilterStore';
import { pageReducer } from './PageStore';
import { queryParamsReducer } from './QueryParamsStore';

const store = configureStore({
	reducer: {
		filmList: filmListReducer,
		filmPage: filmPageReducer,
		filmSearch: filmSearchReducer,
		filter: filterReducer,
		page: pageReducer,
		queryParams: queryParamsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export default store;
