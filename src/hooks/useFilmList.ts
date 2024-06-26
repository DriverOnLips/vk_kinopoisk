import { useDispatch, useSelector } from 'react-redux';
import {
	SetFilms,
	SetMeta,
	DeleteFilms,
} from 'stores/FilmStores/FilmListStore';
import { AgeType } from 'types/AgeType';
import { CountryType } from 'types/CountryType';
import {
	FilmFromListApi,
	FilmFromListModel,
	normalizeFilmFromList,
} from 'types/FilmFromList';

import { RootState } from 'types/StoreTypes';
import { Api } from 'utils/api';
import { log } from 'utils/log';
import { Meta } from 'utils/meta';
import { usePage } from './usePage';

export const useFilmList = () => {
	const api = new Api();

	const { meta, films } = useSelector((state: RootState) => state.filmList);

	const { setPage, setPages } = usePage();

	const dispatch = useDispatch();

	const setFilms = async (
		page: number,
		filmAge: AgeType[],
		filmCountry: CountryType[],
	) => {
		if (meta === Meta.loading) {
			return;
		}

		dispatch(SetMeta(Meta.loading));

		const age = filmAge.find((a) => a.state === true);
		const ageParam =
			!age || age.age === 0
				? undefined
				: age.age === 18
					? '18'
					: `${age.age}-18`;

		const country = filmCountry.find((c) => c.state === true);
		const countryName =
			!country || country.name === 'Все страны' ? undefined : country.name;

		const response = await api.getFilmsForList(page, ageParam, countryName);

		if (response instanceof Error) {
			log(response);
			dispatch(SetMeta(Meta.error));

			return;
		}

		try {
			const filmsFromResponse: FilmFromListModel[] = response?.docs?.map(
				(film: FilmFromListApi) => normalizeFilmFromList(film),
			);

			setPage(response?.page);
			setPages(response?.pages);
			dispatch(SetFilms(filmsFromResponse));
			dispatch(SetMeta(Meta.success));
		} catch (error) {
			log(error);

			setPage(1);
			setPages(1);
			dispatch(DeleteFilms());
			dispatch(SetMeta(Meta.error));
		}
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
