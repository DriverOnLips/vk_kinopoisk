import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './AppStore/AppStore';
import { filmReducer } from './FilmStore';

const store = configureStore({
	reducer: {
		app: appReducer,
		film: filmReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export default store;
