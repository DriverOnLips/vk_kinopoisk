type FilmFromListRating = {
	kp: number;
	imdb: number;
};

type FilmFromListPoster = {
	url: string;
	previewUrl: string;
};

type FilmFromListGenre = {
	name: string;
};

export type FilmFromListApi = {
	id: number;
	name: string;
	year: number;
	rating: FilmFromListRating;
	poster: FilmFromListPoster;
	genres: FilmFromListGenre[];
};

export type FilmFromListModel = {
	id: number;
	name: string;
	year: number;
	rating: number;
	photo: string;
	genre: string;
};

export const normalizeFilmFromList = (
	from: FilmFromListApi,
): FilmFromListModel => ({
	...from,
	rating: from.rating.kp,
	photo: from.poster.previewUrl,
	genre: from.genres
		.map(
			(genre: FilmFromListGenre) =>
				genre.name[0].toLocaleUpperCase() + genre.name.slice(1),
		)
		.join(', '),
});
