import axios from 'axios';
import { FilmApi } from 'types/Film';
import { FilmFromListResponse } from 'types/FilmFromList';
import { FilmFromSearchResponse } from 'types/FilmFromSearch';
import { FilmReviewResponse } from 'types/FilmReview';

export class Api {
	private static instance: Api;
	private config!: { name: string; url: string }[];
	private domain!: string;
	private token: string | undefined;

	constructor() {
		if (Api.instance) {
			return Api.instance;
		}

		Api.instance = this;

		this.domain = 'https://api.kinopoisk.dev/v1.4/';

		// this.token = '65M503X-DGEMWBE-JSNXV9Y-384KZJR';
		// this.token = 'BMQ0PHY-0SCM5Q8-JPZJ1P3-PV28JKJ';
		// this.token = 'FBZJA82-T40M4XZ-G2W29WD-V4DE583';
		this.token = '5M9EE5M-6AB4RSG-KKM19X2-HSJAX8Q';
		// this.token = 'T2XXF72-5AXMJ6Y-N8AX3BT-ACBEVAH';
		// this.token = 'ZX8ZGSZ-PYTM11R-NYKBY15-J29FXHB';
		// this.token = 'R87RDPM-TD7M6QG-QHAPQD3-JP4QTNR';

		this.config = [
			{ name: 'getFilmsForList', url: `${this.domain}movie?` },
			{ name: 'getFilmInfo', url: `${this.domain}movie/` },
			{ name: 'getFilmSeasons', url: `${this.domain}season?` },
			{ name: 'getFilmReviews', url: `${this.domain}review?` },
			{ name: 'getFilmPosters', url: `${this.domain}image?` },
			{ name: 'searchFilm', url: `${this.domain}movie/search?` },
			{ name: 'getRandomFilm', url: `${this.domain}movie/random?` },
		];
	}

	getFilmsForList = async (
		page: number,
		filmsAge?: string,
		countryName?: string,
	): Promise<FilmFromListResponse | Error> => {
		const configItem = this.config.find(
			(item) => item.name === 'getFilmsForList',
		);

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getFilmsForList');
		}

		const selectFields: string[] = [
			'id',
			'name',
			'rating',
			'poster',
			'year',
			'genres',
		];

		const notNullFields: string[] = [
			'id',
			'name',
			'year',
			'description',
			'rating.kp',
			'genres.name',
			'poster.url',
		];

		const queryString =
			selectFields.map((field) => `selectFields=${field}`).join('&') +
			'&' +
			notNullFields.map((field) => `notNullFields=${field}`).join('&');

		const params = {
			page: page,
			limit: 30,
			...(filmsAge && { ageRating: filmsAge }),
			...(countryName && { 'countries.name': countryName }),
		};

		return axios
			.get(`${configItem.url}${queryString}`, {
				params: params,
				headers: {
					accept: 'application/json',
					'X-API-KEY': this.token,
				},
			})
			.then((res) => {
				return res?.data;
			})
			.catch((error) => {
				return new Error(
					error instanceof Error ? error.message : String(error),
				);
			});
	};

	getFilmInfo = async (id: number): Promise<FilmApi | Error> => {
		const configItem = this.config.find((item) => item.name === 'getFilmInfo');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getFilmInfo');
		}

		return axios
			.get(`${configItem.url}${id}`, {
				headers: {
					accept: 'application/json',
					'X-API-KEY': this.token,
				},
			})
			.then((res) => {
				return res?.data;
			})
			.catch((error) => {
				return new Error(
					error instanceof Error ? error.message : String(error),
				);
			});
	};

	getFilmReviews = async (id: number): Promise<FilmReviewResponse | Error> => {
		const configItem = this.config.find(
			(item) => item.name === 'getFilmReviews',
		);

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getFilmReviews');
		}

		const selectFields: string[] = [
			'id',
			'title',
			'type',
			'review',
			'date',
			'author',
		];

		const queryString = selectFields
			.map((field) => `selectFields=${field}`)
			.join('&');

		const params = {
			page: 1,
			limit: 25,
			movieId: id,
		};

		return axios
			.get(`${configItem.url}${queryString}`, {
				params: params,
				headers: {
					accept: 'application/json',
					'X-API-KEY': this.token,
				},
			})
			.then((res) => {
				return res?.data;
			})
			.catch((error) => {
				return new Error(
					error instanceof Error ? error.message : String(error),
				);
			});
	};

	searchFilm = async (
		name: string,
	): Promise<FilmFromSearchResponse | Error> => {
		const configItem = this.config.find((item) => item.name === 'searchFilm');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для searchFilm');
		}

		const params = {
			page: 1,
			limit: 7,
			query: name,
		};

		return axios
			.get(`${configItem.url}`, {
				headers: {
					accept: 'application/json',
					'X-API-KEY': this.token,
				},
				params: params,
			})
			.then((res) => {
				return res?.data;
			})
			.catch((error) => {
				return new Error(
					error instanceof Error ? error.message : String(error),
				);
			});
	};
}
