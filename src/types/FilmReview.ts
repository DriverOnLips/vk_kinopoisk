export type FilmReviewApi = {
	id: number;
	author: string;
	title: string;
	type: 'Позитивный' | 'Негативный';
	review: string;
	date: string;
};

export type FilmReviewModel = {
	id: number;
	username: string;
	title: string;
	type: 'Позитивный' | 'Негативный';
	review: string;
	date: string;
};

export type FilmReviewResponse = {
	docs: FilmReviewApi[];
	page: number;
	pages: number;
};

export const normalizeFilmReview = (from: FilmReviewApi): FilmReviewModel => ({
	...from,
	title: from.title !== '' ? from.title : 'Отзыв',
	username: from.author,
	date: from.date
		.slice(0, from.date.indexOf('T'))
		.replaceAll('-', '.')
		.split('.')
		.reverse()
		.join('.'),
});
