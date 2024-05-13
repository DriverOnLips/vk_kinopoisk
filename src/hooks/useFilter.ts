import { useDispatch, useSelector } from 'react-redux';
import { SetFilmAge, SetFilmCountry } from 'stores/FilterStore/FilterStore';
import { AgeType } from 'types/AgeType';
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

	const setFilmCountry = (countryName: string) => {
		dispatch(SetFilmCountry(countryName));
	};

	const getFilmAge = (): number => {
		return filmAge.find((age: AgeType) => age.state)!.age;
	};

	const getFilmCountry = (): string => {
		return filmCountry.find((country: CountryType) => country.state)!.name;
	};

	return {
		filmAge,
		filmCountry,
		setFilmAge,
		setFilmCountry,
		getFilmAge,
		getFilmCountry,
	};
};
