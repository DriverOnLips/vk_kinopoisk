import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry, { exponentialDelay } from 'axios-retry';
import { FilmApi } from 'types/Film';
import { FilmFromListResponse } from 'types/FilmFromList';
import { FilmFromSearchResponse } from 'types/FilmFromSearch';
import { FilmReviewResponse } from 'types/FilmReview';

export class Api {
	private static instance: Api;
	private axiosInstance!: AxiosInstance;
	private token: string | undefined;

	constructor() {
		if (Api.instance) {
			return Api.instance;
		}

		Api.instance = this;

		// this.token = '65M503X-DGEMWBE-JSNXV9Y-384KZJR';

		// this.token = 'BMQ0PHY-0SCM5Q8-JPZJ1P3-PV28JKJ';
		// this.token = 'FBZJA82-T40M4XZ-G2W29WD-V4DE583';
		this.token = '5M9EE5M-6AB4RSG-KKM19X2-HSJAX8Q';
		// this.token = 'T2XXF72-5AXMJ6Y-N8AX3BT-ACBEVAH';
		// this.token = 'ZX8ZGSZ-PYTM11R-NYKBY15-J29FXHB';
		// this.token = 'R87RDPM-TD7M6QG-QHAPQD3-JP4QTNR';
		// this.token = 'S16XGSJ-47W4Q74-KB17YZW-KNXXDX1';
		// this.token = 'M8N0857-CA1M35T-MN9WZFD-Q2V2F7T';

		this.axiosInstance = axios.create({
			baseURL: 'https://api.kinopoisk.dev/v1.4/',
			timeout: 500,
		});

		axiosRetry(this.axiosInstance, {
			retries: 3,
			retryDelay: exponentialDelay,
		});

		this.axiosInstance.interceptors.request.use((config) => {
			// const requestId = Math.random().toString(36).substring(7);
			config.params = {
				...config.params,
				// requestId: requestId,
			};
			return config;
		});

		this.axiosInstance.interceptors.response.use(
			(response) => response,
			(error) => {
				if (axios.isCancel(error)) {
					return Promise.reject(error);
				}

				if (error.code === 'ECONNABORTED' || error.response?.status === 429) {
					const originalRequest = error.config;
					originalRequest.cancelToken = axios.CancelToken.source().token;
					return new Promise((resolve) => {
						setTimeout(() => resolve(this.axiosInstance(originalRequest)), 100);
					});
				}

				return Promise.reject(error);
			},
		);
	}

	private async makeRequest<T>(config: AxiosRequestConfig): Promise<T | Error> {
		try {
			const response = await this.axiosInstance.request<T>(config);
			return response.data;
		} catch (error) {
			return new Error(error instanceof Error ? error.message : String(error));
		}
	}

	getFilmsForList = async (
		page: number,
		filmsAge?: string,
		countryName?: string,
	): Promise<FilmFromListResponse | Error> => {
		const selectFields: string[] = [
			'id',
			'name',
			'rating',
			'description',
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

		const config = {
			method: 'GET',
			url: `movie?${queryString}`,
			params: params,
			headers: {
				accept: 'application/json',
				'X-API-KEY': this.token,
			},
		};

		return this.makeRequest<FilmFromListResponse>(config);
	};

	getFilmInfo = async (id: number): Promise<FilmApi | Error> => {
		const config = {
			method: 'GET',
			url: `movie/${id}`,
			headers: {
				accept: 'application/json',
				'X-API-KEY': this.token,
			},
		};

		return this.makeRequest<FilmApi>(config);
	};

	getFilmReviews = async (id: number): Promise<FilmReviewResponse | Error> => {
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

		const config = {
			method: 'GET',
			url: `review?${queryString}`,
			params: params,
			headers: {
				accept: 'application/json',
				'X-API-KEY': this.token,
			},
		};

		return this.makeRequest<FilmReviewResponse>(config);
	};

	searchFilm = async (
		name: string,
	): Promise<FilmFromSearchResponse | Error> => {
		const params = {
			page: 1,
			limit: 10,
			query: name,
		};

		const config = {
			method: 'GET',
			url: 'movie/search',
			params: params,
			headers: {
				accept: 'application/json',
				'X-API-KEY': this.token,
			},
		};

		return this.makeRequest<FilmFromSearchResponse>(config);
	};
}
