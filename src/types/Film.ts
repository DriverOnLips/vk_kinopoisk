type FilmReviewType = {
	id: number;
	username: string;
	title: string;
	type: 'positive' | 'negative';
	review: string;
	date: string;
};

type SimilarMoviesType = {
	id: number;
	name: string;
	photo: string;
};

export type FilmModel = {
	id: number;
	name: string;
	description: string;
	rating: number;
	photo: string;
	year: number;
	age: number;
	country: string;
	genres: string[];
	reviews: FilmReviewType[];
	similarMovies: SimilarMoviesType[];
};
