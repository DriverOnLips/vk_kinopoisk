import { configureStore } from '@reduxjs/toolkit';
import { filmReducer } from './FilmStore';

const store = configureStore({
	reducer: {
		film: filmReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export default store;
