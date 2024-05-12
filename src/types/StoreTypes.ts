import { FilmListState } from 'stores/FilmStores/FilmListStore';
import { FilmPageState } from 'stores/FilmStores/FilmPageStore';
import { FilmSearchState } from 'stores/FilmStores/FilmSearchStore';
import { FilterState } from 'stores/FilterStore/FilterStore';
import { PageState } from 'stores/PageStore';
import { QueryParamsState } from 'stores/QueryParamsStore';

export type RootState = {
	filmList: FilmListState;
	filmPage: FilmPageState;
	filmSearch: FilmSearchState;
	filter: FilterState;
	page: PageState;
	queryParams: QueryParamsState;
};
