import axios from 'axios';

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

		this.token = '65M503X-DGEMWBE-JSNXV9Y-384KZJR';
		// this.token = 'BMQ0PHY-0SCM5Q8-JPZJ1P3-PV28JKJ';
		// this.token = 'FBZJA82-T40M4XZ-G2W29WD-V4DE583';
		// this.token = '5M9EE5M-6AB4RSG-KKM19X2-HSJAX8Q';
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
	): Promise<any> => {
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
				return error?.response?.data;
			});
	};

	getFilmInfo = async (id: number): Promise<any> => {
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
				return error?.response?.data;
			});
	};

	getFilmReviews = async (id: number): Promise<any> => {
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
				return error?.response?.data;
			});
	};

	searchFilm = async (name: string): Promise<any> => {
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
				return error?.response?.data;
			});
	};
}