import { CountryType } from './CountryType';
import { FilmReviewModel } from './FilmReview';

export type SimilarFilmsType = {
	id: number;
	name: string;
	photo: string;
};

type FilmRating = {
	kp: number;
	imdb: number;
};

type FilmPoster = {
	url: string;
	previewUrl: string;
};

type FilmCountry = {
	name: string;
};

type FilmGenre = {
	name: string;
};

type SimilarMoviesType = {
	id: number;
	name: string;
	poster: FilmPoster;
};

export type FilmApi = {
	id: number;
	name: string;
	description: string;
	year: number;
	ageRating: number;
	countries: FilmCountry[];
	genres: FilmGenre[];
	rating: FilmRating;
	poster: FilmPoster;
	similarMovies: SimilarMoviesType[];
};

export type FilmModel = {
	id: number;
	name: string;
	description: string;
	year: number;
	age: number;
	country: string;
	rating: number;
	photo: string;
	genre: string;
	similarFilms: SimilarFilmsType[];
	reviews: FilmReviewModel[];
};

export const normalizeFilm = (from: FilmApi): FilmModel => ({
	...from,
	age: from.ageRating,
	country: from.countries.map((ctr: FilmCountry) => ctr.name).join(', '),
	photo: from.poster.previewUrl,
	genre: from.genres
		.map(
			(genre: FilmGenre) =>
				genre.name[0].toLocaleUpperCase() + genre.name.slice(1),
		)
		.join(', '),
	rating: from.rating.kp,
	similarFilms: from.similarMovies?.map((movie) => ({
		...movie,
		photo: movie.poster.previewUrl,
	})),
	reviews: [],
});
