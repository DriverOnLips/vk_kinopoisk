import { useDispatch, useSelector } from 'react-redux';
import { SetFilmAge, SetFilmCountry } from 'stores/FilterStore/FilterStore';
import { CountryType } from 'types/CountryType';
import { RootState } from 'types/StoreTypes';

export const useFilter = () => {
	const { filmAge, filmCountry } = useSelector(
		(store: RootState) => store.filter,
	);

	const dispatch = useDispatch();

	const setFilmAge = (age: number) => {
		dispatch(SetFilmAge(age));
	};

	const setFilmCountry = (countries: CountryType[]) => {
		dispatch(SetFilmCountry(countries));
	};

	const setExactCountry = (countryName: string) => {
		const updatedCountries = filmCountry.map((ctr: CountryType) => {
			return {
				...ctr,
				state: ctr.name === countryName ? true : false,
			};
		});
		dispatch(SetFilmCountry(updatedCountries));
	};

	return {
		filmAge,
		filmCountry,
		setFilmAge,
		setFilmCountry,
		setExactCountry,
	};
};
