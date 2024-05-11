import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './AppStore/AppStore';
import { filmListReducer } from './FilmListStore';
import { filmPageReducer } from './FilmPageStore';
import { filmSearchReducer } from './FilmSearchStore';

const store = configureStore({
	reducer: {
		app: appReducer,
		filmList: filmListReducer,
		filmPage: filmPageReducer,
		filmSearch: filmSearchReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export default store;
