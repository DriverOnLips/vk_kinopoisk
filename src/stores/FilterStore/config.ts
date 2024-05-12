import { AgeType } from 'types/AgeType';
import { CountryType } from 'types/CountryType';

export const filmCountrySet: CountryType[] = [
	{ name: 'Все страны', state: true },
	{ name: 'Россия', state: false },
	{ name: 'США', state: false },
	{ name: 'Канада', state: false },
	{ name: 'Великобритания', state: false },
	{ name: 'Франция', state: false },
	{ name: 'Германия', state: false },
	{ name: 'Италия', state: false },
	{ name: 'Япония', state: false },
	{ name: 'Китай', state: false },
	{ name: 'Индия', state: false },
	{ name: 'Южная Корея', state: false },
];

export const filmAgeSet: AgeType[] = [
	{ age: 0, state: true },
	{ age: 12, state: false },
	{ age: 16, state: false },
	{ age: 18, state: false },
];
