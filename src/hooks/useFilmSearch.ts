import { useDispatch, useSelector } from 'react-redux';
import {
	SetFilmsFromSearch,
	DeleteFilmsFromSearch,
	AddFilmToHistory,
} from 'stores/FilmSearchStore';
import {
	FilmFromSearchApi,
	FilmFromSearchModel,
	normalizeFilmFromSearch,
} from 'types/FilmFromSearch';
import { RootState } from 'types/StoreTypes';
import { Api } from 'utils/api';

export const useFilmSearch = () => {
	const api = new Api();

	const { filmsFromSearch, filmsSearchHistory } = useSelector(
		(state: RootState) => state.filmSearch,
	);

	const dispatch = useDispatch();

	const setFilmsFromSearch = async (name: string) => {
		const response = await api.searchFilm(name);
		const filmsFromResponse: FilmFromSearchModel[] = response?.docs
			?.filter(
				({ id, name, year, genres, poster, countries }: FilmFromSearchApi) =>
					id &&
					name.trim() &&
					year &&
					genres.length > 0 &&
					genres[0] &&
					genres[0].name &&
					poster &&
					poster.previewUrl &&
					countries.length > 0 &&
					countries[0] &&
					countries[0].name,
			)
			.map(normalizeFilmFromSearch);

		dispatch(SetFilmsFromSearch(filmsFromResponse));
	};

	const deleteFilmsFromSearch = () => {
		dispatch(DeleteFilmsFromSearch());
	};

	const addFilmToHistory = (film: FilmFromSearchModel) =>
		dispatch(AddFilmToHistory(film));

	return {
		filmsFromSearch,
		filmsSearchHistory,
		setFilmsFromSearch,
		deleteFilmsFromSearch,
		addFilmToHistory,
	};
};
