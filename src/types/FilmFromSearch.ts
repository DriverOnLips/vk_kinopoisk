import { FilmCountry, FilmGenre, FilmPoster } from './Film';

export type FilmFromSearchApi = {
	id: number;
	name: string;
	year: number;
	genres: FilmGenre[];
	countries: FilmCountry[];
	poster: FilmPoster;
};

export type FilmFromSearchResponse = {
	docs: FilmFromSearchApi[];
	page: number;
	pages: number;
};

export type FilmFromSearchModel = {
	id: number;
	name: string;
	year: number;
	genre: string;
	country: string;
	photo: string;
};

export const normalizeFilmFromSearch = (
	from: FilmFromSearchApi,
): FilmFromSearchModel => ({
	...from,
	photo: from.poster.previewUrl,
	country: from.countries.map((ctr: FilmCountry) => ctr.name).join(', '),
	genre: from.genres
		.map(
			(genre: FilmGenre) =>
				genre.name[0].toLocaleUpperCase() + genre.name.slice(1),
		)
		.join(', '),
});
