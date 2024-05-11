import { useDispatch, useSelector } from 'react-redux';
import { SetFilms, SetMeta, DeleteFilms } from 'stores/FilmListStore';
import { CountryType } from 'types/CountryType';
import {
	FilmFromListApi,
	FilmFromListModel,
	normalizeFilmFromList,
} from 'types/FilmFromList';

import { RootState } from 'types/StoreTypes';
import { Api } from 'utils/api';
import { Meta } from 'utils/meta';
import { useApp } from './useApp';

export const useFilmList = () => {
	const api = new Api();

	const { meta, films } = useSelector((state: RootState) => state.filmList);

	const { setPage, setPages } = useApp();

	const dispatch = useDispatch();

	const setFilms = async (
		page: number,
		filmAge: number,
		filmCountry: CountryType[],
	) => {
		if (meta === Meta.loading) {
			return;
		}

		dispatch(SetMeta(Meta.loading));

		const ageRating =
			filmAge === 0 ? undefined : filmAge !== 18 ? `0-${filmAge}` : '18';
		const country = filmCountry.find((c) => c.state === true);
		const countryName =
			!country || country.name === 'Все страны' ? undefined : country.name;

		const response = await api.getFilmsForList(page, ageRating, countryName);
		const filmsFromResponse: FilmFromListModel[] = response?.docs?.map(
			(film: FilmFromListApi) => normalizeFilmFromList(film),
		);

		dispatch(SetFilms(filmsFromResponse));
		dispatch(SetMeta(Meta.success));
		setPage(response?.page);
		setPages(response?.pages);
	};

	const deleteFilms = () => {
		dispatch(DeleteFilms());
		dispatch(SetMeta(Meta.initial));
	};

	return {
		meta,
		films,
		setFilms,
		deleteFilms,
	};
};