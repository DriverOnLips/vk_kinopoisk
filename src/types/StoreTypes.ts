import { AppState } from 'stores/AppStore/AppStore';
import { FilmListState } from 'stores/FilmListStore';
import { FilmPageState } from 'stores/FilmPageStore';
import { FilmSearchState } from 'stores/FilmSearchStore';

export type RootState = {
	app: AppState;
	filmList: FilmListState;
	filmPage: FilmPageState;
	filmSearch: FilmSearchState;
};
