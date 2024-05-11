import { useDispatch, useSelector } from 'react-redux';
import {
	SetFilm,
	SetFilms,
	DeleteFilm,
	SetFilmsFromSearch,
	DeleteFilmsFromSearch,
	AddFilmToHistory,
	FilmState,
} from 'stores/FilmStore';
import { CountryType } from 'types/CountryType';
import { FilmModel, normalizeFilm } from 'types/Film';
import {
	FilmFromListApi,
	FilmFromListModel,
	normalizeFilmFromList,
} from 'types/FilmFromList';
import { FilmFromSearchModel } from 'types/FilmFromSearch';
import { FilmReviewApi, normalizeFilmReview } from 'types/FilmReview';
import { Api } from 'utils/api';
import { useApp } from './useApp';

export function useFilm() {
	const api = new Api();

	const { film, films, filmsFromSearch, filmsSearchHistory }: FilmState =
		useSelector((state: any) => state.film);

	const { setPage, setPages } = useApp();

	const dispatch = useDispatch();

	const setFilms = async (
		page: number,
		filmAge: number,
		filmCountry: CountryType[],
	) => {
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
		setPage(response?.page);
		setPages(response?.pages);
	};

	const deleteFilm = () => {
		dispatch(DeleteFilm());
	};

	const setFilm = async (id: number) => {
		const response = await api.getFilmInfo(id);

		const filmFromResponse: FilmModel = normalizeFilm(response);

		const reviews = await api.getFilmReviews(id);
		filmFromResponse.reviews = reviews?.docs?.map((review: FilmReviewApi) =>
			normalizeFilmReview(review),
		);

		dispatch(SetFilm(filmFromResponse));
	};

	const setFilmsFromSearch = async (name: string) => {
		const response = await api.searchFilm(name);
		const filmsFromResponse: FilmFromSearchModel[] = response?.docs
			?.filter((item: any) => {
				return (
					item.id !== null &&
					item.name.trim() !== null &&
					item.year !== null &&
					item.genres.length > 0 &&
					item.genres[0] &&
					item.genres[0].name !== null &&
					item.poster &&
					item.poster.previewUrl !== null &&
					item.countries.length > 0 &&
					item.countries[0] &&
					item.countries[0].name !== null
				);
			})
			.map((item: any) => {
				return {
					id: item.id,
					name: item.name,
					year: item.year,
					genre:
						item.genres[0].name.charAt(0).toLocaleUpperCase() +
						item.genres[0].name.slice(1),
					photo: item.poster.previewUrl,
					country: item.countries[0].name,
				};
			});

		dispatch(SetFilmsFromSearch(filmsFromResponse));
	};

	const deleteFilmsFromSearch = () => {
		dispatch(DeleteFilmsFromSearch());
	};

	const addFilmToHistory = (film: FilmFromSearchModel) =>
		dispatch(AddFilmToHistory(film));

	return {
		film,
		films,
		filmsFromSearch,
		filmsSearchHistory,
		setFilms,
		deleteFilm,
		setFilm,
		setFilmsFromSearch,
		deleteFilmsFromSearch,
		addFilmToHistory,
	};
}
