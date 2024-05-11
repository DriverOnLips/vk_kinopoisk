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

	return {
		filmAge,
		filmCountry,
		setFilmAge,
		setFilmCountry,
	};
};
