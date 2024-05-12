import { useDispatch, useSelector } from 'react-redux';
import {
	SetFilmsFromSearch,
	DeleteFilmsFromSearch,
	AddFilmToHistory,
	SetIsSearchOpen,
	SetMeta,
} from 'stores/FilmStores/FilmSearchStore';
import {
	FilmFromSearchApi,
	FilmFromSearchModel,
	normalizeFilmFromSearch,
} from 'types/FilmFromSearch';
import { RootState } from 'types/StoreTypes';
import { Api } from 'utils/api';
import { log } from 'utils/log';
import { Meta } from 'utils/meta';

export const useFilmSearch = () => {
	const api = new Api();

	const { filmsFromSearch, filmsSearchHistory, isSearchOpen, meta } =
		useSelector((state: RootState) => state.filmSearch);

	const dispatch = useDispatch();

	const setFilmsFromSearch = async (name: string) => {
		if (meta === Meta.loading) {
			return;
		}

		dispatch(SetMeta(Meta.loading));

		const response = await api.searchFilm(name);

		if (response instanceof Error) {
			log(response);
			dispatch(SetMeta(Meta.error));

			return;
		}

		try {
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
			dispatch(SetMeta(Meta.success));
		} catch (error) {
			log(error);

			dispatch(DeleteFilmsFromSearch());
			dispatch(SetMeta(Meta.error));
		}
	};

	const deleteFilmsFromSearch = () => {
		dispatch(DeleteFilmsFromSearch());
		dispatch(SetMeta(Meta.initial));
	};

	const addFilmToHistory = (film: FilmFromSearchModel) =>
		dispatch(AddFilmToHistory(film));

	const setIsSearchOpen = (isOpen: boolean) =>
		dispatch(SetIsSearchOpen(isOpen));

	return {
		filmsFromSearch,
		filmsSearchHistory,
		isSearchOpen,
		meta,
		setFilmsFromSearch,
		deleteFilmsFromSearch,
		addFilmToHistory,
		setIsSearchOpen,
	};
};
